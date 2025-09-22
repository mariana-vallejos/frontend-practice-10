import RatingComponent from "./RatingComponent"

const RatingForm = () => {
    return (
        <section className="flex p-10 gap-4 mx-10">
            <div className="flex flex-col w-1/2 px-5">
                <h3 className="text-2xl font-bold">Rating form</h3>
                <div className="flex gap-2 items-center py-2">
                    <label htmlFor="nameRatingForm" className="font-semibold">Name:</label>
                    <input type="text" className="border my-2 rounded px-2" placeholder="Introduce your name here" id="nameRatingForm" />
                </div>
                <div className="">
                    <RatingComponent/>
                </div>
                <div className="flex gap-2 py-2">

                    <label htmlFor="messageRatingForm" className="font-semibold">Message:</label>
                    <textarea name="message" id="messageRatingForm" className="border rounded w-2/3" rows={5} placeholder="Write your message"></textarea>
                </div>
            </div>
            <div className="w-1/2 px-5">
                <h4 className="text-xl font-semibold">Information submitted:</h4>
                <p></p>
            </div>
        </section>
    )
}

export default RatingForm