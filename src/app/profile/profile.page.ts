import { Component, OnInit } from '@angular/core';
import { StorageService } from 'src/services/storage.service';
import { CustomerDTO } from 'src/models/customer.dto';
import { CustomerService } from 'src/services/domain/customer.service';
import { API_CONFIG } from 'src/config/api.config';
import { NavController, Platform } from '@ionic/angular';
import { Camera, CameraOptions, PictureSourceType } from '@ionic-native/camera/ngx';
import { HttpClient } from '@angular/common/http';
import { WebView } from '@ionic-native/ionic-webview/ngx';
import { FilePath } from '@ionic-native/file-path/ngx';
import { File, FileEntry } from '@ionic-native/file/ngx';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

  customer: CustomerDTO;
  picture: { correctPath: string, currentName: string, pathForImage: string };
  isCameraOn: boolean = false;
  profileImage;

  constructor(
    public storage: StorageService,
    public customerService: CustomerService,
    public navCtrl: NavController,
    private camera: Camera,
    private file: File,
    private http: HttpClient,
    private webview: WebView,
    private filePath: FilePath,
    private platform: Platform,
    private sanitizer: DomSanitizer) {
      
    this.profileImage = 'assets/imgs/avatar-blank.png';
  }

  ngOnInit() {
    this.loadData();
  }

  loadData() {
    let localUser = this.storage.getLocalUser();
    if (localUser && localUser.email) {
      this.customerService.findByEmail(localUser.email)
        .subscribe(response => {
          this.customer = response as CustomerDTO;
          this.getImageIfExists();
        }, error => {
          if (error.status == 403) {
            this.navCtrl.navigateRoot("/home");
          }
        });
    } else {
      this.navCtrl.navigateRoot("/home");
    }
  }

  getImageIfExists() {
    this.customerService.getImageFromBucket(this.customer.id)
      .subscribe(response => {
        this.customer.imageUrl = `${API_CONFIG.buckectBaseUrl}/cp${this.customer.id}.jpg`;
        this.blobToDataURL(response).then(dataURL => {
          let str: string = dataURL as string;
          this.profileImage = this.sanitizer.bypassSecurityTrustUrl(str);
        });
      }, error => {
        this.profileImage = 'assets/imgs/avatar-blank.png';
      });
  }

  blobToDataURL(blob) {
    return new Promise((fulfill, reject) => {
      let reader = new FileReader();
      reader.onerror = reject;
      reader.onload = (e) => fulfill(reader.result);
      reader.readAsDataURL(blob);
    });
  }

  getCameraPicture() {
    this.takePicture(this.camera.PictureSourceType.CAMERA);
  }

  getGaleryPicture() {
    this.takePicture(this.camera.PictureSourceType.PHOTOLIBRARY);
  }

  sendPicture() {
    this.file.resolveLocalFilesystemUrl(this.picture.correctPath)
      .then(entry => {
        (<FileEntry>entry).file(file => this.readFile(file))
      })
      .catch(err => {
      });
  }

  readFile(file: any) {
    const reader = new FileReader();
    reader.onload = () => {
      const formData = new FormData();
      const imgBlob = new Blob([reader.result], {
        type: file.type
      });
      formData.append('file', imgBlob, 'file.png');

      this.customerService.uploadPicture(formData)
        .subscribe(response => {
          this.picture = null;
          this.getImageIfExists();
        }, error => { });
    };
    reader.readAsArrayBuffer(file);
  }

  cancel() {
    this.picture = null;
  }

  takePicture(sourceType: PictureSourceType) {
    this.isCameraOn = true;

    var options: CameraOptions = {
      quality: 100,
      sourceType: sourceType,
      saveToPhotoAlbum: false,
      correctOrientation: true,
      mediaType: this.camera.MediaType.PICTURE,
      encodingType: this.camera.EncodingType.PNG,
    };

    this.camera.getPicture(options).then(imagePath => {
      if (this.platform.is('android') && sourceType === this.camera.PictureSourceType.PHOTOLIBRARY) {
        this.filePath.resolveNativePath(imagePath)
          .then(filePath => {
            let correctPath = filePath.substr(0, filePath.lastIndexOf('/') + 1);
            let currentName = imagePath.substring(imagePath.lastIndexOf('/') + 1, imagePath.lastIndexOf('?'));

            this.picture = { correctPath: correctPath, currentName: currentName, pathForImage: this.pathForImage(imagePath) };
          });
      } else {
        var currentName = imagePath.substr(imagePath.lastIndexOf('/') + 1);
        var correctPath = imagePath.substr(0, imagePath.lastIndexOf('/') + 1);

        this.picture = { correctPath: correctPath, currentName: currentName, pathForImage: this.pathForImage(imagePath) };
      }
    });

    this.isCameraOn = false;
  }

  pathForImage(img) {
    if (img === null) {
      return '';
    } else {
      let converted = this.webview.convertFileSrc(img);
      return converted;
    }
  }
}
