# Your project, HeartFleet, provides Emergency AED delivery on demand. Can you tell us where your idea came from?

The idea of humans having RESTful endpoints is super cool, so when I heard that
the Postmates API enabled point-to-point delivery in NYC, we immediately started
thinking about different things to deliver. We had a few ideas, but once Kim
pointed out how we could do a skit to deliver an AED during the demo, the idea
really started to come together.

Heartfleet is a tool for 911 dispatches that lets them dispatch the nearest AED
to the scene of the accident. By New York law, all public places must have one
of these life-saving devices, and our hope is to use technology to get one to a
victim faster than an ambulance. Tragically, with an average response time of
over 12 minutes in parts of NYC, this seems achievable.


# Was this the original idea, or did you guys pivot at some point during the hackathon?

We had the general idea to deliver AEDs via Postmates going into the hackathon,
but figured out all the details and decided on the tech stack at the event.
Initially we were planning on building everything everything on the client, but
after running into some issues with cross-origin API calls (CORS) we added an
express server.


# Can you tell us how the team formed? Did you all know each other prior to the event?

A few months ago, Henry, Max, and Carrie worked together on a project at the
Audible Hackathon. Since then, we'd been itching to work on another project
together, and were lucky enough to have Kim, a long-time friend join us this
time.


# Before we get back to the project, tell us about the actual event. You guys were at AngelHack Manhattan. How was it? Tell us your favorite parts!

Despite being a competitive event, I love the inevitable late night
conversations and collaborations. No one on our team had ever worked with Twilio
before, but before long, someone with experience using their API overheard us.
It wasn't long before they'd spotted our problem, helped us patch it, and
our conversation turned to Starcraft.


# In your mind, what one thing does every hackathon need to make it a successful event?

The knowledgable vendors are an amazing resource for getting up and running with
an unfamiliar API in no time. Ultimately though, it's coffee and carbs that make
24 hours of straight hacking possible.


# Ok back to Heartfleet. We’ve talked about the inspiration, can you tell us a little bit more about the tech? What APIs did you guys use?

We wanted to make it as fast as possible for the dispatcher to choose an AED to
send so our interface is dominated by a dark-themed map courtesy of ESRI. Once
the operator selects a specific AED, we use an Express server to place a
delivery request through Postmates. With help on the way, we then use Twilio to
send a text message to the 911 caller so that, in the event they're not alone,
they're is another chance to get a life-saving AED in time. 


# What are your future plans with the project?
