const Footer = ({title,tagline,phone,email}) => {
    return(
        <footer className="bg-white dark:bg-gray-800">
        <div className="container px-6 py-4 mx-auto">
            <div className="lg:flex justify-around">
                <div className="w-full -mx-6 lg:w-2/5">
                    <div className="px-6">
                        <div>
                            <p className="text-xl font-bold text-indigo-600">{title}</p>
                        </div>
                        
                        <p className="max-w-md mt-2 text-gray-500 dark:text-gray-400">
                            {tagline}
                        </p>
                        
                    </div>
                </div>

                <div className="mt-6 lg:mt-0 lg:flex">
                    <div>
                        <h1 className="text-gray-700 uppercase dark:text-white">Contact</h1>
                        <span className="block mt-2 text-sm text-gray-600 dark:text-gray-400 hover:underline">{phone}</span>
                        <span className="block mt-2 text-sm text-gray-600 dark:text-gray-400 hover:underline">{email}</span>
                    </div>
                </div>
            </div>

            <hr className="h-px my-6 bg-gray-300 border-none dark:bg-gray-700"/>

            <div>
                <p className="text-center text-gray-800 dark:text-white hidden md:block">© {title} - {new Date().getFullYear()} - All rights reserved</p>
            </div>
        </div>
        </footer>
    )
}
export default Footer