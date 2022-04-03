leftwristx = 0;
leftwristy = 0;
rightwristx = 0;
rightwristy = 0;
scoreleftwrist = 0;
scorerightwrist = 0;
function setup() {
    canvas = createCanvas(600, 500);
    canvas.center();

    video = createCapture(VIDEO);
    video.hide();

    poseNet = ml5.poseNet(video, modelLoaded);
    poseNet.on("pose", gotPoses);
}
function draw() {
    image(video, 0, 0, 600, 500);
    fill(255, 0, 0);
    stroke(255, 0, 0);
    if (scorerightwrist > 0.2) {
        circle(rightwristx, rightwristy, 20);
        if (rightwristy > 0 && rightwristy <= 100) {
            document.getElementById("speed").innerHTML = "Speed = 0.5 x ";
            song.rate(0.5);
        }
        else if (rightwristy > 100 && rightwristy <= 200) {
            document.getElementById("speed").innerHTML = "Speed = 1x";
            song.rate(1)
        }
        else if (rightwristy > 200 && rightwristy <= 300) {
            document.getElementById("speed").innerHTML = "Speed = 1.5x";
            song.rate(1.5);
        }
        else if (rightwristy > 300 && rightwristy <= 400) {
            document.getElementById("speed").innerHTML = "Speed = 2x";
            song.rate(2)
        }
        else if (rightwristy > 400 && rightwristy <= 500) {
            document.getElementById("speed").innerHTML = "Speed = 2.5x";
            song.rate(2.5);
        }
    }
    if (scoreleftwrist > 0.2) {
        circle(leftwristx, leftwristy, 20);
        leftwristyin = Number(leftwristy);
        removedecimals = floor(leftwristyin);
        volume = removedecimals / 500;
        document.getElementById("sound").innerHTML = "Volume = " + volume;
        music.setVolume(volume);
    }
}
music = "";
function preload() {
    music = loadSound("Running in the 90's.mp3");
}
function play_music() {
    music.play();
    music.setVolume(1);
    music.rate(1);
    //music.stop(10);
}
function modelLoaded() {
    console.log("PoseNet initialized");
}
function gotPoses(results) {
    if (results.length > 0) {
        console.log(results);
        scoreleftwrist = results[0].pose.keypoints[9].score;
        scorerightwrist = results[0].pose.keypoints[10].score;
        leftwristx = results[0].pose.leftWrist.x;
        leftwristy = results[0].pose.leftWrist.y - 5;
        rightwristx = results[0].pose.rightWrist.x;
        rightwristy = results[0].pose.rightWrist.y - 5;
        console.log(leftwristx + ", " + leftwristy + ", " + rightwristx + ", " + rightwristy);
    }
}
