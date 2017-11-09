## Klara Code Challenge

Klara Chat

By - Amitesh Kumar 


## User story

I tried to build a story to explain the App.


There are three friends in a village, Rakesh, Suresh and Amitesh . When they were in school they use to meet for gossip. Now all are graduated and doing their job in different cities. They are now missing those days. In this group Amitesh is software engineer, Rakesh and Suresh are in sales. Amitesh proposes to build some application to reconnect with each other. This is how the `Gupsup` app ideated. 

All three friends met again to talk about Gupsup. (Gupsup means `A casual chit chat`)

Here is the discussion thread for this idea.


`@amitesh`: Guys can you suggest basic features for our app and a name for `it`. 

`@suresh`: How about we say it `Gupshup`.

`@amitesh`: looks cool. Lets remove `h` from 'Gupshup' and make it simple. 'h' is making spike or little jurk.

`@rakesh`: sounds good. Now we have a name 'Gupsup'.

`@suresh`: yeah, its cool. (cool)

`@amitesh`: awesome. :)

`@rakesh`: I think, when I go to Gupsup.com. I should see the list of users/groups (#streams). I can select it and start chat with them.

`@amitesh`: okay. But how system knows who all are the users of this app. 

`@suresh`: hmmm, we need user management system. (wondering)

`@amitesh`: Yes. So how user will be added to our app? Do we need full user management? I say, keep it simple, take user name, email password and no email confirmation for now. Don't spend much time and effort on this part for now.

`@suresh`: sounds good. But let me know in app, when any user signs in and not in my current list.

`@amitesh`: Sure. It will be in #real time.

`@rakesh`: I think, it is nice to have, if we can create different #topics/conversations in a group or with user. It helps us to talk about different parts of our life like, about village progress, with old school friends and for some social cause.

`@suresh`: cool.

`@amitesh`: Guys, different topic looks good feature to make it clutter free. But I say, keep group and topic features for later releases. But I will keep provision in app code base. (@silent: this is the reason I have created the provision for streams and conversation as two separate entity. Once we introduce the group and topics then it will be implemented with it. (devil) Sales are always crazy.)

`@rakesh`: Yes. We should keep it aside for now and focus on the basic chat between friends. (handshake)

`@amitesh`: We are doing awesome guys. So my oldest friend will come on top of the user list (#stream list). 

`@rakesh`: I think, order should be based on recently chat users.

`@suresh`: How about most chat people comes first?

`@rakesh`: I think, recently chat user list is more near to real scenario. But yes, we can add view filter on list later.

`@amitesh`: Right Rakesh. Even in real we talk frequently those people to whom we met recently. If we have recent chat user on top 
`then its easy to switch the chat between the users/groups. But I like the filter idea from @rakesh`. 

`@suresh`: Yes. I think recent chat user order will be more useful.

`@amitesh`: Cool. :) . But it will be again for future release. I will show the first join users on top. (@silent these guys don't know, it will save me from developing some sorting queries and time.). On selection of user from the list (#stream list), it will open the #conversation section. Conversation section, will show the messages and it has a #editor on bottom to write messages. What you guys say. 

`@suresh`: sounds good. If we keep the user(stream) list and conversation section side by side then switching between user will be easy.

`@rakesh`: yes. It helps user and improve UX.

`@suresh`: I think, if we keep the #compose box on top and messages will be below.

`@amitesh`: I think, we keep the compose box at bottom and messages on top. It seems more comfortable for user. Because messages will be instantly and easy to read on top of editor box.

`@rakesh`: yes. It is not commenting system which is passive communication (User are not bother to read all) while Gupsup will be very active communication. +1 for compose box at bottom. (y)

`@suresh`: yeah, fine for me. :)

`@amitesh`: I think, as we agree about compose box at bottom, we also agree for the latest message should be at bottom in message list. and it should be in visible area. (@silent scroll will be on bottom to show the last message).

`@rakesh`: yup.

`@amitesh`: Lets show all messages of the conversation with current user (or in current stream). Each message will come with message text, sender name and ago time. I love to add user avatar to make UI more intuitive and beautiful if get some time. Avatars will be random for now but decided on server to make consistent on every user app.

`@rakesh`: Awesome! show the message thread and my message will come right side and other's message on left.

`@amitesh`: Sure.

`@suresh`: guys, I have to take a break and join you in 15 minutes.

`@rakesh`: sure buddy take your time. 
`@amitesh` Is it possible to know, my message is received or not to other user. Very similar to the SMS confirmation.

`@amitesh`: hmmm, Yes. We can but again its extra feature which not required in this release I think.

`@rakesh`: But I think about it. If I know, my current action is done and reached to destination then it will give me more piece of mind.

`@amitesh`: Absolutely. I totally agree. We can show some tick notation for it. (@silent inspired from whatsapp) We can show an animated gray tick when user sending a message to our main server. Once it reached to server then magic start happen. it will become gray tick without animation. Again when it reaches to recipient app then it will be double gray tick. And finally when recipient reads it then it will become blue double tick. (Mission accomplished :) ) But I will see how much time permit us.

`@rakesh`: Awesome! It will be really great. But I really request you to give it high priority and show this magic in first release only.

`@amitesh`: I will try my best. One thing, the message ago time will not be updated in real time. It will be calculated on each load of messages in conversation box. Will do later.

`@rakesh`: yeah its fine. But show the exact sent time on hover on it.

`@amitesh`: sure.

## Message Editor

`@suresh`: Hello guys. I am back. So where are we

`@amitesh`: We just finalize the flow of message journey from sender to recipient with visual tick indicator. 

`@suresh`: cool. And we are building it in first version.

`@amitesh`: Yes. Okay lets talk about editor. I will keep the message editor simple. It will accept only text no rich text support. Message will be sent by pressing enter or by click on a button along with it.

`@rakesh`: sounds good.

`@suresh`: me too.

## Message

`@rakesh`: What is I am talking with Amitesh and Suresh send me some message. Is it updated in app?

`@amitesh`: Good question. We will increase the unread message count on each user list (stream). I will keep this for next time but for now it will appear with a random number to show the look and feel. At the time of chat all messages will be updated in real time with its status.

`@rakesh`: okay.

`@amitesh`: I think, we talk much and we start hacking it. In the development journey we will keep discussing about it and new things.

## After 8 days

`@rakesh`: Hi Amitesh, How are you? How Gupsup is coming along?

`@amitesh`: Awesome guys. I hope in 2-3 days I will show you its first version. stay tuned!!

`@rakesh`: Great.

## After 10 days

`@amitesh`: Hi guys, How are you doing. I want to do some Gupsup. I have programmed the Gupsup app with minimal features which we discussed last week.

`@rakesh`: AWESOME. 

`@amitesh`: but you need to setup the app on your laptop for now. It is not on cloud server unfortunately.

`@rakesh`: No problem Buddy. Let me know, how can I run this on my machine.

`@suresh`: Yeah send us steps to setup it.

`@amitesh`: sure buddy. I suggest, you guys get help of any admin in your circle to setup some prerequisite softwares.

`@rakesh`: no problem.



`@amitesh`: Here is the steps to set it up.

## Steps:
- Install Ruby 2.0 and Rails 4.2. Try to run some sample rails app to check it is setup correctly or not.
- Install nodejs, npm and gulp eco system.
- Unzip the Gupsup folder some where.
- Install all gems by running the `bundle install` command
- Setup database by running `bundle exec rake db:setup`
- Try to run the rails server by running `rails s` command (1)
- Try to load the the app in browser with url `http://localhost:3000`.
- Install npm packages and gulp plugins `npm install`
- Run the gulp task as `gulp` (2)
- I am using guard live reload plugin. You can run it using `bundle exec guard` command. But it is optional. You can skip it. (3)
- Run the pub/sub server to send the messages in real time. 
  `rackup private_pub.ru -s thin -E production` (4)
  Run this in `production` environment only else it will give error.

For running Gupsup we are running 3-4 services on the machine. If you face any issue then check the config for the respective services or let me know.

## How to use **Gupsup**

- Try to sign up with two account on two different browser.
- Both will appear in each others user list.
- Start the chat with each other.

If you get any issue while installing then google about it or let me know. I have developed it on Ubuntu OS and tested on chrome but it should work on other OS as well.

 

### Requirement:
Basic requirement of code challenge => At least two users should be able to send and receive messages

### This is code challenge give me an opportunity to: 
- Architect the app and its flow.
- Think about the smaller thing.
- Decide on the UI.
- Decide the features which is more align with the challenge.
- Show the Quick learning capability and technical skill.


### Features implemented:
- User sign-up/sign-in/sign-out. Email validation or confirmation is not implemented.
- Show the user's list as streams for now. But it should implemented as stream when we have group and topic feature. I kept the provision for it on server.
- Fetch the previous conversation between the current user and selected user. On very first time the first user is get selected by default.
- If new user sign-in then show in the all open user app.
- Send Messages on enter key and on plan button click.
- Push the messages to all subscribed apps.
- Show the message status as  => sending, sent, received and read through tick with message. I try to design this whole feature to interact with the faye push server and react-flux app.
- Received the new messages. If the message it for the current conversation then show it otherwise ignore for now.



### Features not implemented:
- Notification for unread message count
- Group chat
- Chat in topics
- Security consideration with faye
- User Avatar
- Test cases
- User status (online, offline)
- Send CSRF token with every call.

### Side modules or low priority:
- authentication (using devise)
- Better UI and UX

### Tools used:
- Rails 4.2 & Ruby 2.0
- SCSS, Bootstrap
- Gulp task to build the Reactjs + flux app using browserify.
- Guard livereload for development.
- Private_pub gem as a wrapper for `faye` server for real-time communication through pub/sub pattern.
- Rabl gem to render json data for API calls


I have not extensively used ES6 syntax in this app. I am still practicing or working onto it. I know the beauty of it and happy to learn it and use it extensively.


Gupsup App Architecture
=======================

I kept the rails app and react app separate. Server is mostly working as an API server also used for user signup and sign in. There is `default gulp` task which will build the Reactjs app and push the bundle to rails asset/javascript/react-app folder. It served with rails app as usual.


Server Entities:

- User: App user. It can be part of many streams.
- Stream : Buddy or group                         [not implemented]
- Topic: Stream has many topics                   [not implemented]
- Conversation: Topic has one conversation
- Message: Conversation has many messages

Client:

Reactjs + Flux

```
Actions:
  - StreamActions
  - ConversationActions
  - MessageActions
Components:
  - Layout
    -- Streams:
    -- Conversation
      --- Message
      --- Editor

Constants:      
  - StreamsConstants
  - MessageConstants

Dispatcher:
  - AppDispatcher

Stores:
  - StreamStore
  - MessageStore
```


### Thank you
Amitesh Kumar 
(amitesingh@gmail.com)