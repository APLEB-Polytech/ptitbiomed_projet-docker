import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {MatDialog} from '@angular/material/dialog';
import {Article, IArticle} from "../../shared/model/IArticle";
import {ArticleService} from "../article.service";
import {ChooseMediaComponent} from "../../media/choose-media/choose-media.component";
import {IMedia} from "../../shared/model/IMedia";
import {ActivatedRoute, Router} from "@angular/router";
import {HttpResponse} from "@angular/common/http";

@Component({
  selector: 'app-article-editor',
  templateUrl: './article-editor.component.html',
  styleUrls: ['./article-editor.component.css']
})
export class ArticleEditorComponent implements OnInit {

  htmlContent: string = '';

  formArticle: FormGroup = new FormGroup<any>({
    title: new FormControl<string>("", [Validators.required]),
    author: new FormControl<string>("", [Validators.required]),
    content: new FormControl<string>("", [Validators.required]),
  })

  uuidArticle?: string
  article?: IArticle
  titre: string = 'Ajouter un article'

  constructor(private articleService: ArticleService, public dialog: MatDialog, private route: ActivatedRoute, private router: Router) {
    if (this.route.snapshot.params['uuid']) {
      this.titre = 'Modifier l\'article'
      this.uuidArticle = this.route.snapshot.params['uuid']
      this.loadArticle()
    }
  }

  ngOnInit(): void {
    this.formArticle.controls['content'].valueChanges
      .subscribe(value => this.htmlContent = value)
  }

  loadArticle() {
    if (this.uuidArticle === undefined) {
      return;
    }
    this.articleService.getArticleByUUID(this.uuidArticle).subscribe({
      next: (response: HttpResponse<IArticle>) => {
        if (!response.ok || !response.body) {
          throw new Error('Erreur lors du chargement de l\'article')
        }
        this.article = response.body
        this.formArticle.controls['title'].setValue(response.body.title)
        this.formArticle.controls['author'].setValue(response.body.author)
        this.formArticle.controls['content'].setValue(response.body.html)
      }
    })
  }

  createArticle() {
    const article: IArticle = new Article(
      this.formArticle.controls['author'].value,
      this.formArticle.controls['title'].value,
      this.formArticle.controls['content'].value,
    );
    if (this.uuidArticle) {
      article.uuid = this.uuidArticle
      this.articleService.updateArticle(article).subscribe({
        next: (response) => {
          if (response.ok) {
            this.router.navigate(['/article'])
          } else {
            alert('KO');
          }
        }
      });
      return;
    }
    this.articleService.addArticle(article).subscribe({
      next: (response) => {
        if (response.ok) {
          this.router.navigate(['/article'])
        } else {
          alert('KO');
        }
      }
    });

  }

  ajouterMedia(): void {
    const dialog = this.dialog.open(ChooseMediaComponent, {
      width: '1500px'
    })

    dialog.afterClosed().subscribe((media: IMedia) => {
      if (media.type.startsWith('image/')) {
        const html: string = `<img alt="" loading="lazy" src="/api/media/downloadFile/${media.hash}">`
        this.formArticle.controls['content'].setValue(this.formArticle.controls['content'].value + html)
      }
    })
  }
}
