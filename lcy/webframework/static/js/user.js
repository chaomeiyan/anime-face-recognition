function facedet() {
    let src = cv.imread('canvasInput');
    let src_canvas = document.getElementById('canvasInput')
    let gray = new cv.Mat();
    cv.cvtColor(src, gray, cv.COLOR_RGBA2GRAY, 0);
    let faces = new cv.RectVector();
    let faceCascade = new cv.CascadeClassifier();
    console.log("Face Detection Initialization");
    faceCascade.load('lbpcascade_animeface.xml');
    console.log("lbpcascade_animeface.xml loaded");
    // detect faces
    let msize = new cv.Size(30, 30);
    faceCascade.detectMultiScale(gray, faces, 1.1, 3, 0, msize);
    console.log("face detected");
    for (let i = 0; i < faces.size(); ++i) {
        let face = faces.get(i);
        let width = face.width;
        let height = face.height;
        console.log(faces.get(i));

        addToList(face.x, face.y, width, height, src_canvas)
        
    }
    src.delete(); gray.delete(); faceCascade.delete();
    faces.delete();
}

function addToList(x, y, width, height, src_canvas) {
    var result = $("<canvas class='result_pic' width='" + width + "' height='" + height + 
                    "'></canvas><button class='delete_button'>删除此项</button>");
    $('#mylist').append(result);
    console.log(result)
    result[0].getContext('2d').drawImage(src_canvas,
        x, y, width, height,
        0, 0, width, height
    );
    result[1].addEventListener('click', (e) => {
        let x = result[1];
        console.log(x);
        console.log(x.previousSibling);
        x.previousSibling.remove();
        x.remove();
    })
}