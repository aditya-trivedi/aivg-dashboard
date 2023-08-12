import { Component, Inject, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { AivideoService } from 'src/app/services/aivideo.service';
import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop';
import {
  normalVoiceSampleAvailableLanguages,
  paidVoiceSampleAvailableLanguages,
  videoAspectRatio,
} from 'src/shared/utils';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogRef
} from '@angular/material/dialog';
import { Router } from '@angular/router';

@Component({
  selector: 'app-article-to-video',
  templateUrl: './article-to-video.component.html',
  styleUrls: ['./article-to-video.component.css'],
})
export class ArticleToVideoComponent {


  dummyStructuredData = {
    "image_list": ['https://images.unsplash.com/photo-1575936123452-b67c3203c357?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aW1hZ2V8ZW58MHx8MHx8fDA%3D&w=1000&q=80,','https://www.searchenginejournal.com/wp-content/uploads/2022/06/image-search-1600-x-840-px-62c6dc4ff1eee-sej-1280x720.png'],
    "voiceover_s3_key": 'https://aivid-local.s3.amazonaws.com/1/voiceover/elbs1bc2213bb82440e0af97a0b0304af20a',
    "add_subtitles": false,
    "language": 'english',
    "is_portrait": false
  }

  imageUrl: any; // Variable to store the image URL for preview
  videoName: string = '';

  onFileSelected(event: any) {
    const fileInput: HTMLInputElement = event.target;
    // @ts-ignore
    const file = fileInput.files[0];

    if (file) {
      // Read the file as a Data URL to show the preview
      const reader = new FileReader();
      reader.onload = async (e: any) => {
        this.imageUrl = e.target.result;
        let blobFile = this.dataURLToBlob(this.imageUrl);
        const formData = new FormData();
        const currentTimestampMillis = new Date().getTime();
        // TODO: Add proper file name
        formData.append('content', blobFile, `Uploaded_Audio_${currentTimestampMillis}.mp3`);
        let res : any = await this.Aivideoservice.uploadFile(formData)
        console.log(res)
      };
      reader.readAsDataURL(file);
    }
  }



  isImageGeneratedOnce = false;
  normalVoiceSampleAvailableLanguages = normalVoiceSampleAvailableLanguages;
  paidVoiceSampleAvailableLanguages = paidVoiceSampleAvailableLanguages;
  currentNormalVoiceSample = {
    audioLink: '',
    value: '',
  };

  currentPaidVoiceSample = {
    audioLink: '',
  };

  articleTextFormGroup = this._formBuilder.group({
    articleText: [
      '',
      [
        Validators.required,
        Validators.maxLength(2000),
        Validators.minLength(100),
      ],
    ],
    articleLanguage: ['', [Validators.required]],
  });
  setSubtitles: any = false;

  constructor(
    private _formBuilder: FormBuilder,
    private Aivideoservice: AivideoService,
    private dialog: MatDialog,
    private router: Router
  ) {}

  imagePreviews: Array<any> = [];
  uploadedImagePreviews: Array<any> = [];
  generatedImagePreviews: Array<any> = [];
  selectedImages = [];
  imageStepValidityForm = new FormControl('');
  generatedAudioLink: any;
  generateAudioError = '';
  generateAudioStatus = '';
  sampleAudioFilePolly: string = '';
  sampleAudioFileElevenLabs: string = '';
  uploadedAudioFileSrc: any;
  finalAudioSrc: any;
  generateImageButtonText: any = 'Generate Image';
  paidAudioVoiceIsFemale = true;
  videoAspectRatioArray = videoAspectRatio;
  selectedAspectRatio = this.videoAspectRatioArray[0].value;
  aspectRatioMap: any = {
    one_one: ' 1 : 1',
    four_three: '4 : 3',
    three_four: '3 : 4',
    nine_sixteen: '9 : 16',
    sixteen_nine: '16 : 9',
  };

  selectImages(event: any): void {
    this.selectedImages = event.target.files;

    if (this.selectedImages && this.selectedImages[0]) {
      if (this.selectedImages.length + this.uploadedImagePreviews.length > 10) {
        return;
      }
      const numberOfFiles = this.selectedImages.length;
      for (let i = 0; i < numberOfFiles; i++) {
        const reader = new FileReader();

        reader.onload = (e: any) => {
          this.uploadedImagePreviews.push(e.target.result);
        };

        reader.readAsDataURL(this.selectedImages[i]);
      }
      this.selectedImages = [];
    }
  }

  generateImagesRelatedToArticle() {
    this.generateImageButtonText = 'Generating...';
    let data = this.articleTextFormGroup.value.articleText;
    this.Aivideoservice.generateImageBasedOnText({ story: data }).subscribe(
      (response: any) => {
        this.generateImageButtonText = 'Re-Generate Images';
        this.isImageGeneratedOnce = false;
        let images = response.data;
        for (const key in images) {
          if (images.hasOwnProperty(key)) {
            const value = images[key];
            this.generatedImagePreviews =
              this.generatedImagePreviews.concat(value);
          }
        }
      },
      (error: any) => {
        console.error('Error generating images:', error);
        this.generateImageButtonText = 'Regenerate image';
      }
    );
  }

  drop(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    } else if (
      event.container.id == 'cdk-drop-list-2' &&
      this.imagePreviews.length === 10
    ) {
      return;
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    }
    if (this.imagePreviews.length <= 10 && this.imagePreviews.length > 0) {
      this.imageStepValidityForm.reset();
    } else {
      this.imageStepValidityForm.setErrors({ required: true });
    }
  }

  onAudioUpload(event: any) {
    this.finalAudioSrc = '';
    if (event.target.files && event.target.files[0]) {
      const selectedAudio = event.target.files[0];

      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.uploadedAudioFileSrc = e.target.result;
      };

      reader.readAsDataURL(selectedAudio);
    }
  }

  onNormalVoiceSampleChange(event: any) {
    let indexOfAudio = normalVoiceSampleAvailableLanguages.findIndex(
      (lang) => lang.value === event.value
    );
    this.currentNormalVoiceSample =
      normalVoiceSampleAvailableLanguages[indexOfAudio];
  }

  onPaidVoiceSampleChange(event: any) {
    let indexOfAudio = paidVoiceSampleAvailableLanguages.findIndex(
      (lang) => lang.value === event.value
    );
    this.currentPaidVoiceSample =
      paidVoiceSampleAvailableLanguages[indexOfAudio];
  }

  logger(data: any) {
    console.log(data);
  }

  removeUploadedAudio() {
    this.uploadedAudioFileSrc = undefined;
  }

  generateAudio(isPremium: boolean) {
    this.finalAudioSrc = '';
    this.generateAudioStatus = 'Generating Audio...';
    this.generatedAudioLink = undefined;
    const generateAudioData = {
      story: this.articleTextFormGroup.value.articleText,
      // story : "A wiki (/ˈwɪki/ (listen) WIK-ee) is an online hypertext publication collaboratively edited and managed by its own audience, using a web browser. A typical wiki contains multiple pages for the subjects or scope of the project, and could be either open to the public or limited to use within an organization for maintaining its internal knowledge base.Wikis are enabled by wiki software, otherwise known as wiki engines. A wiki engine, being a form of a content management system, differs from other web-based systems such as blog software",
      is_female: this.paidAudioVoiceIsFemale,
      is_mock: true,
      language: this.articleTextFormGroup.value.articleLanguage,
      // language : 'english'
    };

    this.Aivideoservice.generateAudioForArticleText(
      generateAudioData,
      isPremium
    ).subscribe(
      (response: any) => {
        this.urlIsActive(response.url)
          .then((url: any) => {
            this.generatedAudioLink = url;
            this.generateAudioStatus = '';
          })
          .catch((error: any) => {
            this.generateAudioError = error;
            this.generateAudioStatus = '';
          });
      },
      (error) => {
        this.generateAudioError = 'Something went wrong';
      }
    );
  }

  // This function waits for the S3 URL to become active after the MP3 is uploaded.
  urlIsActive(url: any) {
    return new Promise((resolve, reject) => {
      let urlActiveInterval = setInterval(async () => {
        const result = await fetch(url);
        if (result.status == 200) {
          clearInterval(urlActiveInterval);
          resolve(url);
        }
      }, 5000);
      setTimeout(() => {
        clearInterval(urlActiveInterval);
        reject('Time limit exceeded');
      }, 90000);
    });
  }

  toggleFemaleMaleVoice(event: any) {
    this.paidAudioVoiceIsFemale = event.value;
  }

  setAspectRatio(event: any) {
    this.selectedAspectRatio = event.value;
  }

  onSubtitlesToggleChange(event: any) {
    this.setSubtitles = event.checked;
  }

  onAudioSelect(event: any) {
    this.finalAudioSrc = event.value;
  }

  async generateVideo() {
    this.validateGenerateVideoData(); // Complete this in next iteration
    await this.uploadImagesAndAudios();
    const structureData = this.structureGenerateVideoData()
    console.log(structureData)
    this.Aivideoservice.generateVideo(structureData).subscribe(
      (response: any) => {
        this.router.navigate(['/my-videos']);
      }, 
      (err) => {
        console.log(err)
      }
    )
    // clear all variables
    console.log('GENERATE VIDEO CALLED');
  }

  structureGenerateVideoData() {
    let height = 480;
    let width = 640;
    switch (this.selectedAspectRatio) {
      case 'one_one':
        width = 480;
        height = 480;
        break;
        
      case 'three_four':
        width = 360;
        height = 480;
        break;
    
      case 'four_three':
        width = 480;
        height = 360;
        break;
    
      case 'sixteen_nine':
        width = 360;
        height = 640;
        break;
    
      case 'nine_sixteen':
        width = 360;
        height = 640;
        break;
    
      default:
        break;
    }
    

    return {
      "image_list": this.imagePreviews,
      "voiceover_s3_key": this.finalAudioSrc,
      "add_subtitles": this.setSubtitles,
      "language": this.articleTextFormGroup.value.articleLanguage?.slice(0,2),
      "name": this.videoName,
      "height": height,
      "width": width
    }
  }

  async uploadImagesAndAudios() {
    let uploadFileLink: any;
    let tempImagePreviews: any = [];

    if (this.uploadedAudioFileSrc && this.generatedAudioLink) {
      uploadFileLink = this.finalAudioSrc;
    } else if (this.uploadedAudioFileSrc) {
      uploadFileLink = this.uploadedAudioFileSrc;
    } else if (this.generatedAudioLink) {
      uploadFileLink = this.generatedAudioLink;
    } else {
      // TODO : Snack bar
      return;
    }

    if( uploadFileLink.includes('amazon'))
      this.finalAudioSrc = uploadFileLink;
    else {
      const blob = this.dataURLToBlob(uploadFileLink);
      const formData = new FormData();
      const currentTimestampMillis = new Date().getTime();
      // TODO: Add proper file name
      formData.append('content', blob, `Uploaded_Audio_${currentTimestampMillis}.mp3`);
      let audioresponse : any = await this.Aivideoservice.uploadFile(formData)
      console.log(audioresponse)
      console.log(audioresponse.s3_url, "s3 url of uploaded audio");
      this.finalAudioSrc = audioresponse.s3_url;
    }

    if (!this.imagePreviews.length) {
      // TODO : Snackbar
      return;
    }
    this.imagePreviews.forEach(async (image) => {
      console.log(image)
      if (image.includes('data:image')) {
        const blob = this.dataURLToBlob(image);
        const formData = new FormData();
        const currentTimestampMillis = new Date().getTime();
        // TODO: Add proper file name
        formData.append('content', blob, `Uploaded_image_${currentTimestampMillis}.jpg`);
        let response : any = await this.Aivideoservice.uploadFile(formData);
        tempImagePreviews.push(response.s3_url);
      } else {
        tempImagePreviews.push(image);
      }
    });
    console.log(tempImagePreviews)
    this.imagePreviews = tempImagePreviews;
    console.log(this.imagePreviews)
  }

  validateGenerateVideoData() {}

  dataURLToBlob(dataURI: string): Blob {
    // convert base64/URLEncoded data component to raw binary data held in a string
    var byteString;
    if (dataURI.split(',')[0].indexOf('base64') >= 0)
        byteString = atob(dataURI.split(',')[1]);
    else
        byteString = unescape(dataURI.split(',')[1]);

    // separate out the mime component
    var mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];

    // write the bytes of the string to a typed array
    var ia = new Uint8Array(byteString.length);
    for (var i = 0; i < byteString.length; i++) {
        ia[i] = byteString.charCodeAt(i);
    }

    return new Blob([ia], {type:mimeString});
  }
}
