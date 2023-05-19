import Alert from "../Alert";
import { useLocation } from "react-router-dom";

/**
 * About US
 * @page
 */
export default function AboutUS() {
    const { state } = useLocation();
    return (
        <div>
            {state && state.response && <Alert response={state.response} />}
            <div className="px-4 py-10 bg-gradient-to-b from-red-500 to-red-800 h-full">
                <main>
                    <div className="flex items-center flex-col">
                        <h1 className="text-5xl font-bold">About US</h1>
                        <h2 className="mt-8 text-lg uppercase font-bold italic text-white">
                            The ToyotaPrius team
                        </h2>
                    </div>
                    <div className="mt-16 flex flex-wrap items-center justify-center">
                        <div className="w-1/2 pr-8">
                            <img
                                className="w-full rounded-lg shadow-xl"
                                src={"../../img/audietrongt.jpg"}
                                alt="Ken block audi etron gt"
                            />
                        </div>
                        <div className="w-1/2">
                            <div className="text-white">
                                <ul className="list-disc text-xl">
                                    <li>The 3 of us have interest in cars</li>
                                    <li>We all agreed that it is hard to find good reviews of cars without searching multiple social media and websites</li>
                                    <li>So we decided to create a car review website to have centralized in-depth unbiased reviews of every car you could think of</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
}
