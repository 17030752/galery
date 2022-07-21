const fileInput = document.querySelector('#file');
const filesContainer = document.querySelector('#files-container');

fileInput.addEventListener('change', e => {
    const files = e.target.files;
    processFiles(files);

});

function processFiles(files) {
    for (const file of files) {
        const fileReader = new FileReader();
        fileReader.readAsDataURL(file);
        fileReader.addEventListener('load', e => {
            const url = fileReader.result;
            const sizePrep = file.size /1024;
            const size = sizePrep > 1000 ? parseInt(sizePrep / 1024).toFixed(2) + 'Mb' : parseFloat(sizePrep).toFixed(2) + 'Kb';
            const id = 'id-' + crypto.randomUUID();

            const html = `
<div class ="file-item">
<img src="${url}" width="300"/>
<div>${file.name}</div>
<div>${size}</div>
<div id="size-${id}">0%</div>
<div class="progress-bar" id="${id}" >0%</div>
</div>
`;
            filesContainer.innerHTML += html;
            upload(file, id);

        });
    };
}
function upload(file,id){
    return new Promise((resolve , reject)=>{
        const xhr = new XMLHttpRequest();
        xhr.upload.onload= function(){
            console.log('upload successfull');
            resolve();
        };
        xhr.upload.error = function(){
            console.error('upload fail!');
            reject();
        }
        xhr.upload.abort= function(){
            console.error('upload cancel..');
        }
        xhr.upload.onprogress= function(e){
            const container = document.querySelector('#' + id);
            const sizeDiv = document.querySelector('#size-' + id);
        
            console.log(`uploaded ${e.loaded} of ${e.total} bytes`);
            //container.style.height ='10px';
            //container.style.backgroundColor='blue';
            container.style.width=((e.loaded / e.total)*100) +'%';
            sizeDiv.textContent=((e.loaded / e.total)*100).toFixed(0) +'%';
        }
        xhr.open('POST','?view=upload');
        const formData=new FormData();
        formData.append('file',file);
        xhr.send(formData);
    });
}