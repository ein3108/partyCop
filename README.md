*Akshay, please read this and follow the instructions to execute*

1. I'm assuming that you do have not `node.js` installed. If this is the case, please install it as well as its legacy code (to prevent the possible conflicts that could arise from the packages that I'm using) as follows:
  ```
  sudo apt-get update
  sudo apt-get install nodejs
  sudo apt-get install nodejs-legacy
  ```

1. Now you need to install `npm`. The simplest way to do this is through `yum`. First download the `yum` software package as follows:

  ```
  sudo apt-get install yum
  ```

  Then install `npm`:
  ```
  yum install npm
  ```

1. Okay, now you have the npm set, clone this repository at your local
  ```
  git clone git@github.com:ein3108/partyCop.git
  ```

1. Then, `cd partyCop` and `npm install`

1. Go into the *app.js* file and change the ip address and the port number for the iRobot connection (you'd need to reconfigure the network interface on BeagleBone, you can change it with `sudo vi /etc/network/interfaces`.) It's stored in the `options` variable. 

1. Now for the eyetracker. You'd need to first install the server using the file that I sent you on FB (it's a dropbox link). Once you installed the server, connect the eye tracker (it needs to be connected to a USB 3.0 port). You need to calibrate it, and once you have it positioned correctly, it'll detect your eyes pretty accurately. The default port that it's using would be 6555 (check if you're not sure -- there's a setting tab in the client). 

1. I did not change the speed of the iRobot yet. You can run the iRobot server on Beaglebone by executing the following command:
  ```
  (Don't forget to write UART1 & 2)
  ./partyCopServer [Port #]
  ```

1. Then you're set to go! Go to the 'partyCop' folder and execute the following:
  ```
  npm start
  ```

1. If your iRobot server greets you with one of "going straight," "turning left," "turning right," "going back"  as you change your gaze position, everything's working (ignore the 'parse error' message from npm start' for now; I'll get to that if I had time)

1. You'll have to pull the source once more later, as I'll connect it to the webserver & visualization. At the same time, I'll be working on pulling the ethanol sensor data.

1. Please let me know if you ran into any sort of problem -- cheers!
