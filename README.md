  
  
  
  
  
#  Mini Project 3 | Message-Oriented Middleware
  
  
_System Integration, fall 2020_
  
Authors  
**Pernille Lørup**  
**Rasmus Helsgaun**  
**Stephan Djurhuus**  
**Adam Lass**
  
![cover image](/assets/cover.png?0.600208278511531 )  
  
##  Content
  
  
- [Objectives](/#objectives )
- [Technical Features](/#technical-features )
  - [Summary](/#summary )
  - [Business Case](/#business-case )
    - [Load Persons](/#load-persons )
    - [Get Gender](/#get-gender )
    - [Handle Mail Template](/#handle-mail-template )
    - [Handle Queue](/#handle-queue )
- [Prerequisite](/#prerequisite )
- [Project Setup](/#project-setup )
- [Execution](/#execution )
  - [RabbitMQ](/#rabbitmq )
    - [Start RabbitMQ Service](/#start-rabbitmq-service )
    - [Login To RabbitMQ](/#login-to-rabbitmq )
  - [Sender](/#sender )
  - [Receiver](/#receiver )
    - [Receiver | rasmus@mail.com](/#receiver-rasmusmailcom )
    - [Receiver | pernille@mail.com](/#receiver-pernillemailcom )
    - [Receiver | adam@mail.com](/#receiver-adammailcom )
    - [Receiver | stephan@mail.com](/#receiver-stephanmailcom )
  
##  Objectives
  
  
###  Assignment 3: Mail Services
  
  
Create a messaging application, which sends notification letters to a group of people at a specified time, under the following conditions:
  
The names and mail addresses of the group members are stored in either xml or json file.
  
The content of the letter is stored in a text file.  
The letter should start with the salutation “Dear XX NN,”, where
  
-   XX is either ‘Mr’ or ‘Ms’, depending on the gender of the receiver;
-   NN is the name of the receiver.
  
The gender of the receiver can be discovered by use of a web service, hosted at http://www.thomas-bayer.com/restnames/
  
Choose one task or replace it with your own. The solution gives 15 credits, in which Peergrade review and presentation in class are included.
  
[Extended Description](https://datsoftlyngby.github.io/soft2020fall/resources/135fdeae-A8-MOM.pdf )
  
##  Technical Features
  
  
###  Summary
  
  
This project demonstrates a Message-Oriented Middleware system with one `Sender` and multiple `Receivers`. It uses Enterprise Integration Patterns to process the data.
  
###  Business Case
  
  
We selected Assignment 3: Mail Services. The stores user data is in a [json file](/src/assets/persons.json ) alongside with a [mail template](/src/assets/mail.txt ). These files are processed by our Enterprise Integration Patterns filters described below.
  
####  Load Persons
  
  
This filter loads and returns the stored json file containing all person objects.
  
####  Get Gender
  
  
This filter uses an [API](https://api.genderize.io ) to determine the gender based on a given name.
The result is returned alongside with the person's email.
  
####  Handle Mail Template
  
  
This filter loads the mail template and replaces `XX` with the correct title based on the gender. Subsequently it replaces the `NN` with the given name and returns the altered mail and the person's email address.
  
####  Handle Queue
  
  
This filter sends the altered mails to the corresponding email addresses after a delay of 5 seconds. This delay can be modified to fit the preferred use case.
  
##  Prerequisite
  
  
-   [Node.js](https://nodejs.org/en/ )
-   [RabbitMQ](https://www.rabbitmq.com/download.html )
  
##  Project Setup
  
  
To install all dependencies run the script below.
  
```bash
# bash
npm install
```
  
##  Execution
  
  
###  RabbitMQ
  
  
####  Start RabbitMQ Service
  
  
_MacOS_
  
```bash
# bash
brew services start rabbitmq
```
  
_Windows_
  
```bash
# bash
rabbitmq-service.bat start
```
  
> remember to close the service after running the project
  
####  Login To RabbitMQ
  
  
Go to [localhost:15672](http://localhost:15672/#/ )
  
```bash
username: guest;
password: guest;
```
  
Go to Queues and observe the upcoming results, later when the projects is running.
  
###  Sender
  
  
Sends messages to predefined topics after processing the data files from [/assets](/src/assets ).
  
```bash
# bash
npm run sender
```
  
###  Receiver
  
  
Receives message from `Sender` when subscribed to a specific topic.
  
####  Receiver | rasmus@mail.com
  
  
```bash
# bash
npm run rasmus
```
  
####  Receiver | pernille@mail.com
  
  
```bash
# bash
npm run pernille
```
  
####  Receiver | adam@mail.com
  
  
```bash
# bash
npm run adam
```
  
####  Receiver | stephan@mail.com
  
  
```bash
# bash
npm run stephan
```
  
## 
  
  
Software Development @ Copenhagen Business Academy, Denmark 2020
  