import { NextResponse } from "next/server";

export async function POST(req, res) {
  var data = [
    {
      surveyTitle: "Social Issues Awareness Survey",
      description:
        "This survey aims to gather feedback from individuals about their awareness and attitudes towards various social issues.",
      questions: [
        {
          qNo: 1,
          question: "What social issues are you most concerned about?",
          type: "text",
        },
        {
          qNo: 2,
          question:
            "Do you actively participate in any social activism or volunteer work?",
          type: "text",
        },
        {
          qNo: 3,
          question: "How optimistic are you about the future of society?",
          type: "scale",
          range: [1, 5],
        },
      ],
    },
    {
      surveyTitle: "Customer Satisfaction Survey",
      description:
        "This survey aims to gather feedback from customers about their satisfaction with our products and services. Your responses will help us improve our offerings and provide better experiences for our customers.",
      questions: [
        {
          qNo: 1,
          question: "What is your favorite season?",
          type: "text",
        },
        {
          qNo: 2,
          question: "Which mobile phone brand do you prefer?",
          type: "radio",
          options: {
            option1: "Apple",
            option2: "Samsung",
            option3: "Google",
          },
        },
        {
          qNo: 3,
          question: "On a scale of 1 to 10, how happy are you today?",
          type: "scale",
          range: [1, 10],
        },
      ],
    },
    {
      surveyTitle: "Employee Feedback Survey",
      description:
        "This survey aims to collect feedback from employees about their satisfaction with the workplace environment and company policies.",
      questions: [
        {
          qNo: 1,
          question: "What department do you work in?",
          type: "text",
        },
        {
          qNo: 2,
          question: "How satisfied are you with your current workload?",
          type: "scale",
          range: [1, 5],
        },
        {
          qNo: 3,
          question: "Do you feel valued by your direct supervisor?",
          type: "radio",
          options: {
            option1: "Yes",
            option2: "No",
          },
        },
      ],
    },
    {
      surveyTitle: "Restaurant Experience Survey",
      description:
        "This survey aims to gather feedback from customers about their dining experience at our restaurant.",
      questions: [
        {
          qNo: 1,
          question: "How often do you dine at our restaurant?",
          type: "text",
        },
        {
          qNo: 2,
          question: "How would you rate the quality of food served?",
          type: "scale",
          range: [1, 10],
        },
        {
          qNo: 3,
          question:
            "Are you satisfied with the variety of menu options available?",
          type: "radio",
          options: {
            option1: "Yes",
            option2: "No",
          },
        },
      ],
    },
    {
      surveyTitle: "Fitness Center Feedback Survey",
      description:
        "This survey aims to gather feedback from members about their experience at our fitness center.",
      questions: [
        {
          qNo: 1,
          question: "How often do you visit the fitness center?",
          type: "text",
        },
        {
          qNo: 2,
          question:
            "Are you satisfied with the variety of equipment available?",
          type: "radio",
          options: {
            option1: "Yes",
            option2: "No",
          },
        },
        {
          qNo: 3,
          question:
            "How clean do you find the facilities at the fitness center?",
          type: "scale",
          range: [1, 5],
        },
      ],
    },
    {
      surveyTitle: "Travel Experience Survey",
      description:
        "This survey aims to gather feedback from travelers about their recent travel experiences.",
      questions: [
        {
          qNo: 1,
          question: "How often do you travel for leisure?",
          type: "text",
        },
        {
          qNo: 2,
          question:
            "What mode of transportation do you usually prefer when traveling long distances?",
          type: "text",
        },
        {
          qNo: 3,
          question:
            "How satisfied are you with the booking process for your recent trip?",
          type: "scale",
          range: [1, 10],
        },
      ],
    },
    {
      surveyTitle: "Online Shopping Experience Survey",
      description:
        "This survey aims to gather feedback from customers about their experience shopping online.",
      questions: [
        {
          qNo: 1,
          question: "How often do you shop online?",
          type: "text",
        },
        {
          qNo: 2,
          question:
            "Which online platforms do you frequently use for shopping?",
          type: "text",
        },
        {
          qNo: 3,
          question:
            "How satisfied are you with the user interface of the online shopping websites/apps you use?",
          type: "scale",
          range: [1, 5],
        },
      ],
    },
    {
      surveyTitle: "Educational Institution Feedback Survey",
      description:
        "This survey aims to gather feedback from students about their experience at our educational institution.",
      questions: [
        {
          qNo: 1,
          question: "What program are you currently enrolled in?",
          type: "text",
        },
        {
          qNo: 2,
          question:
            "How satisfied are you with the quality of education provided?",
          type: "scale",
          range: [1, 5],
        },
        {
          qNo: 3,
          question:
            "Are you satisfied with the resources and facilities available to students?",
          type: "radio",
          options: {
            option1: "Yes",
            option2: "No",
          },
        },
      ],
    },
    {
      surveyTitle: "Hotel Feedback Survey",
      description:
        "This survey aims to gather feedback from guests about their recent stay at our hotel.",
      questions: [
        {
          qNo: 1,
          question:
            "How often do you stay in hotels for leisure or business travel?",
          type: "text",
        },
        {
          qNo: 2,
          question: "How satisfied were you with the check-in process?",
          type: "scale",
          range: [1, 5],
        },
        {
          qNo: 3,
          question:
            "Did you encounter any issues with your room during your stay? If yes, please specify.",
          type: "text",
        },
      ],
    },
    {
      surveyTitle: "Environmental Awareness Survey",
      description:
        "This survey aims to gather feedback from individuals about their awareness and attitudes towards environmental issues.",
      questions: [
        {
          qNo: 1,
          question:
            "How concerned are you about environmental issues such as climate change and pollution?",
          type: "scale",
          range: [1, 5],
        },
        {
          qNo: 2,
          question:
            "What actions do you currently take to reduce your environmental impact (recycling, conserving energy, etc.)?",
          type: "text",
        },
        {
          qNo: 3,
          question: "How informed do you feel about environmental issues?",
          type: "scale",
          range: [1, 5],
        },
      ],
    },
    {
      surveyTitle: "Mental Health Awareness Survey",
      description:
        "This survey aims to gather feedback from individuals about their awareness and attitudes towards mental health.",
      questions: [
        {
          qNo: 1,
          question:
            "How important do you believe mental health is compared to physical health?",
          type: "scale",
          range: [1, 5],
        },
        {
          qNo: 2,
          question:
            "Have you ever experienced mental health challenges such as anxiety or depression?",
          type: "radio",
          options: {
            option1: "Yes",
            option2: "No",
          },
        },
        {
          qNo: 3,
          question:
            "How comfortable do you feel discussing mental health with friends or family?",
          type: "scale",
          range: [1, 5],
        },
      ],
    },
    {
      surveyTitle: "Consumer Electronics Survey",
      description:
        "This survey aims to gather feedback from consumers about their preferences and usage of electronic devices.",
      questions: [
        {
          qNo: 1,
          question: "How often do you purchase new electronic devices?",
          type: "text",
        },
        {
          qNo: 2,
          question: "Which electronic devices do you use on a daily basis?",
          type: "text",
        },
        {
          qNo: 3,
          question:
            "How satisfied are you with the performance of your current smartphone/laptop/tablet?",
          type: "scale",
          range: [1, 5],
        },
      ],
    },
    {
      surveyTitle: "Social Media Usage Survey",
      description:
        "This survey aims to gather feedback from individuals about their usage and attitudes towards social media platforms.",
      questions: [
        {
          qNo: 1,
          question: "Which social media platforms do you use regularly?",
          type: "text",
        },
        {
          qNo: 2,
          question:
            "How many hours per day do you spend on social media, on average?",
          type: "text",
        },
        {
          qNo: 3,
          question: "How do you feel social media affects your mental health?",
          type: "scale",
          range: [1, 5],
        },
      ],
    },
    {
      surveyTitle: "Online Streaming Services Survey",
      description:
        "This survey aims to gather feedback from consumers about their usage and preferences for online streaming services.",
      questions: [
        {
          qNo: 1,
          question: "Which online streaming services do you subscribe to?",
          type: "text",
        },
        {
          qNo: 2,
          question:
            "How often do you use online streaming services to watch TV shows and movies?",
          type: "text",
        },
        {
          qNo: 3,
          question:
            "What factors influence your decision to subscribe to a streaming service (content library, price, user interface, etc.)?",
          type: "text",
        },
      ],
    },
    {
      surveyTitle: "Home Improvement Survey",
      description:
        "This survey aims to gather feedback from homeowners about their experiences with home improvement projects.",
      questions: [
        {
          qNo: 1,
          question: "How often do you undertake home improvement projects?",
          type: "text",
        },
        {
          qNo: 2,
          question:
            "What types of home improvement projects have you completed in the past year?",
          type: "text",
        },
        {
          qNo: 3,
          question:
            "How satisfied were you with the results of your most recent home improvement project?",
          type: "scale",
          range: [1, 5],
        },
      ],
    },
    {
      surveyTitle: "Automotive Industry Survey",
      description:
        "This survey aims to gather feedback from car owners about their experiences with automotive brands and services.",
      questions: [
        {
          qNo: 1,
          question: "How satisfied are you with your current vehicle?",
          type: "scale",
          range: [1, 5],
        },
        {
          qNo: 2,
          question:
            "Which factors influenced your decision when purchasing your vehicle (price, brand reputation, features, etc.)?",
          type: "text",
        },
        {
          qNo: 3,
          question:
            "Have you encountered any issues or defects with your vehicle since purchasing it?",
          type: "radio",
          options: {
            option1: "Yes",
            option2: "No",
          },
        },
      ],
    },
    {
      surveyTitle: "Gaming Habits Survey",
      description:
        "This survey aims to gather feedback from gamers about their gaming habits and preferences.",
      questions: [
        {
          qNo: 1,
          question: "How often do you play video games?",
          type: "text",
        },
        {
          qNo: 2,
          question:
            "What gaming platforms do you use (PC, console, mobile, etc.)?",
          type: "text",
        },
        {
          qNo: 3,
          question: "What genres of video games do you enjoy playing the most?",
          type: "text",
        },
      ],
    },
    {
      surveyTitle: "Food Preferences Survey",
      description:
        "This survey aims to gather feedback from individuals about their food preferences and dietary habits.",
      questions: [
        {
          qNo: 1,
          question: "What is your favorite cuisine?",
          type: "text",
        },
        {
          qNo: 2,
          question:
            "Do you follow any specific dietary restrictions (vegetarian, vegan, gluten-free, etc.)?",
          type: "text",
        },
        {
          qNo: 3,
          question: "How often do you cook at home?",
          type: "text",
        },
      ],
    },
    {
      surveyTitle: "Fashion Preferences Survey",
      description:
        "This survey aims to gather feedback from individuals about their fashion preferences and shopping habits.",
      questions: [
        {
          qNo: 1,
          question: "What is your preferred style of clothing?",
          type: "text",
        },
        {
          qNo: 2,
          question: "Where do you usually shop for clothes?",
          type: "text",
        },
        {
          qNo: 3,
          question:
            "How important are fashion trends to you when selecting clothing?",
          type: "scale",
          range: [1, 5],
        },
      ],
    },
    {
      surveyTitle: "Pet Ownership Survey",
      description:
        "This survey aims to gather feedback from pet owners about their experiences and preferences for pet care.",
      questions: [
        {
          qNo: 1,
          question: "Do you own any pets?",
          type: "radio",
          options: {
            option1: "Yes",
            option2: "No",
          },
        },
        {
          qNo: 2,
          question: "What type of pets do you own?",
          type: "text",
        },
        {
          qNo: 3,
          question: "How often do you take your pet to the veterinarian?",
          type: "text",
        },
      ],
    },
  ];
  const { start, end } = await req.json();
  try {
    await Promise.all(
      data.slice(start ? start : 0, end).map(async (element) => {
        let sendReq = await fetch("http://localhost:3000/api/survey", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(element),
        });
        sendReq = await sendReq.json();
        console.log(sendReq.survey._id);
        if (sendReq.error) {
          throw sendReq;
        }
      })
    );
    return NextResponse.json(
      { error: false, message: "Surveys created" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: true, message: "Internal server error" },
      { status: 500 }
    );
  }
}
