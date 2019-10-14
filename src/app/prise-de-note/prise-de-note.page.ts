import { Component, OnInit } from '@angular/core';
import { Plugins, CameraResultType, CameraSource, FilesystemDirectory } from '@capacitor/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
const { Storage, Filesystem, Camera, Capacitor } = Plugins;

@Component({
  selector: 'app-prise-de-note',
  templateUrl: './prise-de-note.page.html',
  styleUrls: ['./prise-de-note.page.scss'],
})
export class PriseDeNotePage implements OnInit {

  photo: SafeResourceUrl;
  notesEnrigistrees: string;
  listeDesPhotoEnString: string[] = [];

  constructor(private sanitizer: DomSanitizer) { }

  ngOnInit() {
    Storage.get({ key: 'notesEnrigistrees' }).then(ret => {
      if (ret.value) {
        this.notesEnrigistrees = JSON.parse(ret.value) as string;
      }
    });

    Storage.get({ key: 'photoEnrigistrees' }).then(ret => {
      if (ret.value) {
        let listeDesPhotoEnrigistrees = JSON.parse(ret.value) as string[];
        for (const photoEnString of listeDesPhotoEnrigistrees) {
          this.listeDesPhotoEnString.push(photoEnString)
        }
      }


    });
  }

  async enregistrer(notesEnrigistrees: string) {
    await Storage.set({
      key: 'notesEnrigistrees',
      value: notesEnrigistrees
    });
  }

  enregistrerPhoto(photoEnrigistrees: string) {


    Storage.get({ key: 'photoEnrigistrees' }).then(ret => {
      if (ret.value) {
        let listeDesPhotoEnrigistrees = JSON.parse(ret.value) as string[];
        if (listeDesPhotoEnrigistrees) {
          this.listeDesPhotoEnString = listeDesPhotoEnrigistrees;
        }
        this.listeDesPhotoEnString.push(photoEnrigistrees);
        Storage.set({
          key: 'photoEnrigistrees',
          value: JSON.stringify(this.listeDesPhotoEnString)
        });
      } else {
        Storage.set({
          key: 'photoEnrigistrees',
          value: JSON.stringify([photoEnrigistrees])
        });
      }


    });
  }

  async takePicture() {
    const image = await Plugins.Camera.getPhoto({
      quality: 100,
      allowEditing: false,
      resultType: CameraResultType.DataUrl,
      source: CameraSource.Photos

    });
    this.enregistrerPhoto(image && (image.dataUrl));
    this.photo = this.sanitizer.bypassSecurityTrustResourceUrl(image && (image.dataUrl));
  }

  async takeGallerie() {
    const image = await Plugins.Camera.getPhoto({
      quality: 100,
      allowEditing: false,
      resultType: CameraResultType.DataUrl,
      source: CameraSource.Photos

    });
    this.enregistrerPhoto(image && (image.dataUrl));
    this.photo = this.sanitizer.bypassSecurityTrustResourceUrl(image && (image.dataUrl));
  }



}
