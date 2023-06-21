sound = "";
leftWristX = 0;
leftWristY = 0;
rightWristX = 0;
rightWristY = 0;
scoreleftWrist = 0;

function preload(){
    sound = loadSound('music.mp3');
}

function setup(){
    canvas = createCanvas(400, 350);
    canvas.center();

    video = createCapture(VIDEO);
    video.hide();

    poseNet = ml5.poseNet(video, modelLoaded);
    poseNet.on('pose' ,gotposes);
}

function gotposes(results){
    if(results.length > 0){
        console.log(results);
        leftWristX = results[0].pose.leftWrist.x;
        leftWristY = results[0].pose.leftWrist.y;
        console.log('Left wrist x = ' + leftWristX + ' Left wrist y = ' + leftWristY);
        rightWristX = results[0].pose.rightWrist.x;
        rightWristY = results[0].pose.rightWrist.y;
        console.log('Right wrist x = ' + rightWristX + ' Right wrist y = ' + rightWristY);
        scoreleftWrist = results[0].pose.keypoints[9].score;
        console.log('score of left wrist = ' + scoreleftWrist);
    }
}

function modelLoaded(){
    console.log('PoseNet is Initialized');
}

function draw(){
    image(video, 0, 0, 400, 350);

    fill('red');
    stroke('red');
    if (scoreleftWrist > 0.2){
    circle(leftWristX, leftWristY, 50);
    numberleftWristY = Number(leftWristY);
    noDecimal = floor(numberleftWristY);
    volume = noDecimal/500;
    sound.setVolume(volume);
    document.getElementById('volume').innerHTML = "Volume = " + volume;
    }
}

function firstPlay(){
    sound.play();
    sound.rate(1);
    sound.setVolume(1);
}

