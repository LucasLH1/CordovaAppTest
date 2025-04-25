/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
var app = {
    // Application Constructor
    initialize: function () {
        document.addEventListener('deviceready', this.onDeviceReady.bind(this), false);
    },

    // deviceready Event Handler
    //
    // Bind any cordova events here. Common events are:
    // 'pause', 'resume', etc.
    onDeviceReady: function () {
        this.receivedEvent('deviceready');
    },

    // Update DOM on a Received Event
    receivedEvent: function (id) {
        var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');
        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');

        console.log('Received Event: ' + id);



        let options = {
            x: 0,
            y: 0,
            width: window.screen.width / 2,
            height: window.screen.height / 2,
            camera: CameraPreview.CAMERA_DIRECTION.BACK,
            toBack: false,
            tapPhoto: false,
            tapFocus: false,
            previewDrag: false,
            storeToFile: true,
            disableExifHeaderStripping: false
        };


        let optionsVideo = {
            cameraDirection: CameraPreview.CAMERA_DIRECTION.BACK,
            width: window.screen.width / 2,
            height: window.screen.height / 2,
            quality: 60,
            withFlash: false
        }


        var startCam = document.getElementById("startCam");
        var stopCam = document.getElementById("stopCam");
        var startRecordCam = document.getElementById("startRecordCam");
        var stopRecordCam = document.getElementById("recordCam");
        var flip = document.getElementById("flip");
        startCam.addEventListener("click", () => {

            CameraPreview.startCamera(options);
        })

        stopCam.addEventListener("click", () => {

            CameraPreview.stopCamera();
        })
        stopRecordCam.addEventListener("click", () => {
            CameraPreview.stopRecordVideo((fp1) => {
                //your video path here
                console.log(fp1);
            }, (fp) => {

                console.log(fp);
            });
        })

        startRecordCam.addEventListener("click", () => {
            //starting recording file
            CameraPreview.startRecordVideo(optionsVideo, (s) => { console.log(s) }, (e) => {
                console.log(e);
            });


        })

        flip.addEventListener("click", () => {
            //switch camera
            CameraPreview.switchCamera((s) => { console.log(s) }, (e) => {
                console.log(e);
            });


        })



    }
};

app.initialize();