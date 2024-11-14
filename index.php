<!DOCTYPE html>
<html>
<head>
    <title>Welcome</title>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
	<link href="https://fonts.googleapis.com/css2?family=Audiowide&display=swap" rel="stylesheet">
	<link rel="icon" type="image/x-icon" href="images\icon.ico">
    <link rel="stylesheet" href="formStyle.css">
    <style>
        body {
            width: 100vw;
            height: 100vh;
        }
        .log-in, .reg {
            display: flex;
            text-align: center;
            align-items: center;
            justify-content: center;
            max-width: 3.5vw;
        }

        .log-in button {
            margin-bottom: 10px;
        }

        .reg button, .log-in button {
            border: none;
            border-radius: 10px;
            background-color: white;
            width: 45vw;
            color: #840705;
        }

        .reg h3, .log-in h3 {
            font-weight: bold;            
            font-size: 18px;
            padding: 1vh;
            margin: 0;
        }

        .title {
            text-align: center;
        }

        @media screen and (max-width: 800px) {
            .reg button, .log-in button {
                font-size: 13px;
                width: 35vw;
            }
            
            .logo {
                width: 35vw;
                margin-left: 5vw;
            }
        }
    </style>
</head>
<body>
    <div class="left-half">
        <img src="./images/ASINTA.png" class="logo">
    </div>
    <div class="right-half">
		<div class="title">
			<h1>Student Interactive Navigation Tool App</h1>
		</div>
        <div class="log-in">
			<a href="login.php"><button><h3>LOGIN</h3></button></a>
		</div>
		<div class="reg">
            <a href="register.php"><button><h3>REGISTER</h3></button></a>
        </div>
    </div>
</body>
</html>
