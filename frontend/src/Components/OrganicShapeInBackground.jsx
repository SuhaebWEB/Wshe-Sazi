const backgroundShape = () => {
    return (
        <>
            {/* the background shape */}
            <div className="fixed inset-0 overflow-hidden -z-10">
                <div className="z-10 absolute -right-[300px] 1.5xl:right-0 1.5xl:top-10">
                    <img
                        src="../public/SVG/OrganicShapeBackground.svg"
                        alt="Search Icon"
                        className="w-[660px] h-[1004px]"
                    />
                </div>
            </div>
        </>
    );
}

export default backgroundShape;