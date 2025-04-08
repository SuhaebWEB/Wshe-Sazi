const PageHeader = (props) => {
    return (
        <>
            <p className="pt-10 pb-10 font-bold 1.5xl:text-5xl text-2xl text-white flex items-center">
                {props.title}
            </p>
        </>
    );
}

export default PageHeader;