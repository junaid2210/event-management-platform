const HomeHero = ({ collegeId }) => {
    return (
        <div className="bg-blue-600 py-16 px-6 text-center text-white">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
                What's happening at {collegeId ? collegeId.toUpperCase() : 'your campus'}?
            </h1>
            <p className="text-blue-100 text-lg">
                Discover workshops, fests, and hackathons near you.
            </p>
        </div>
    );
};

export default HomeHero;