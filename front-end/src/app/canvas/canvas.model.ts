export class CanvasObject {
    imgArr: Array<ImgObj>;
    textArr: Array<TextObj>;
    constructor(options: {
        images?: Array<ImgObj>,
        texts?: Array<TextObj>
    } = {}) {
        this.imgArr = options.images || [];
        this.textArr = options.texts || [];
    }

    addImage(url: string) {
        let newImg = new ImgObj(url);
        this.imgArr.push(newImg);
    }

    addText(value: string) {
        let newTxt = new TextObj(value);
        this.textArr.push(newTxt);
    }
}

export class TextObj {
    value: string;
    x: number;
    y: number;
    constructor(value: string, x?: number, y?: Number) {
        this.value = value;
    }
}

export class ImgObj {
    url: string;
    x: number;
    y: number;
    constructor(url: string, x?: number, y?: Number) {
        this.url = url;
    }
}