import { currentUser } from "@clerk/nextjs";

export async function WelcomMsg() {
    const user = await currentUser();

    if (!user) {
        return <div>error</div>;
    }

    return (
        <div className="flex w-full mb-12">
            <h1 className="">
                <span className="text-lg">
                    Welcome
                </span>
                <br />
                <span className="text-6xl font-bold  bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 text-transparent bg-clip-text">
                    {user.firstName} {user.lastName}
                </span>
            </h1>
        </div>
    );
}