var app = {
    currentImage: "",
    notes: [],

    initialize: function () {
        document.addEventListener('deviceready', this.onDeviceReady.bind(this), false);
    },

    onDeviceReady: function () {
        console.log("App ready");
        this.notes = JSON.parse(localStorage.getItem("notes") || "[]");

        const page = document.body.getAttribute("data-page");

        switch (page) {
            case "home":
                this.initHomePage();
                break;
            case "add":
                this.initAddPage();
                break;
        }
    },

    //Page d'accueil
    initHomePage: function () {
        const list = document.getElementById("notesList");
        const btn = document.getElementById("addNoteBtn");

        btn.addEventListener("click", () => {
            location.href = "add.html";
        });

        list.innerHTML = "";

        this.notes.forEach(note => {
            const li = document.createElement("li");
            li.innerHTML = `
                <strong>${note.date}</strong><br>
                ${note.texte.substring(0, 30)}<br>
                <img src="${note.image}" width="100"><br><br>
            `;
            list.appendChild(li);
        });
    },

    //Page ajout de note
    initAddPage: function () {
        const startBtn = document.getElementById("startCamera");
        const captureBtn = document.getElementById("takePicture");
        const preview = document.getElementById("preview");

        startBtn.addEventListener("click", () => {
            CameraPreview.startCamera({
                x: 0,
                y: 0,
                width: window.screen.width,
                height: window.screen.height / 2,
                camera: CameraPreview.CAMERA_DIRECTION.BACK,
                toBack: false,
                tapPhoto: false,
                previewDrag: false,
                storeToFile: true
            });

            captureBtn.style.display = "inline-block";
        });

        captureBtn.addEventListener("click", () => {
            CameraPreview.takePicture({ width: 800, height: 600, quality: 85 }, (result) => {
                const imgSrc = 'data:image/jpeg;base64,' + result;
                app.currentImage = imgSrc;
                preview.src = imgSrc;

                CameraPreview.stopCamera();
                captureBtn.style.display = "none";
            });
        });

        document.getElementById("saveNote").addEventListener("click", () => {
            const text = document.getElementById("noteText").value.trim();
            const date = new Date().toLocaleString();

            if (!text || !app.currentImage) {
                alert("Merci d'écrire une note et de prendre une photo.");
                return;
            }

            const newNote = {
                id: Date.now(),
                texte: text,
                image: app.currentImage,
                date: date
            };

            this.notes.push(newNote);
            localStorage.setItem("notes", JSON.stringify(this.notes));
            location.href = "index.html";
        });
    }
};

app.initialize();
