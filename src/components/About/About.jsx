import "../About/About.css";

function About () {
    return (
        <section className="About">
        <div className="about__image-container">
            <img 
                alt="About"
                className="about__image"
            />
        </div>
        <div className="about__text-container">
        <h2 className="about__title">About the author</h2>
        <p className="about__description">
        Welcome to the News Explorer Application, created by Theodore Lesser as part of the TripleTen Software Engineering curriculum! This app was created to help you explore and stay current on topics that interest you. 


        </p>
        <p className="about__description">
        Search for articles, save them to your profile, and build a personalized collection of information. I encourage you to dive in, learn something new, and have fun along the way. Happy exploring!

        </p>
        </div>
        </section>
    )

}

export default About; 