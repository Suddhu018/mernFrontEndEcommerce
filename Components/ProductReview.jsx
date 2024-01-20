function ProductReview(props) {
  let allreviews = props.productdata.productReview;
  allreviews.reverse();

  function submitReview() {
    const reviewData = document.getElementById("text").value;
    document.getElementById("text").value = "";
    const token = localStorage.getItem("token");
    const headers = new Headers({
      authorization: token,
      "Content-Type": "application/json", ///this is very important otherwise this will give undefined body type at the backend
    });
    if (reviewData) {
      fetch(`https://mern-backend-ecommerce-eight.vercel.app/reviewSubmit`, {
        method: "POST",
        headers: headers,
        body: JSON.stringify({
          reviewData: reviewData,
          productName: props.productdata.productName,
        }),
      }).then(function (response) {
        response.json().then(function (data) {
          if (response.status == 200) {
            ////removing existing divs
            var container = document.getElementById("maincommentContainer");

            // Get all child divs except the first one
            var childDivs = Array.from(container.children).slice(1);

            // Remove each child div
            childDivs.forEach(function (div) {
              container.removeChild(div);
            }); //////////////////////
            //adding all divs again
            for (let i = data.length - 1; i >= 0; i--) {
              var newDiv = document.createElement("div");
              newDiv.className =
                "bg-mainBoxes text-Written mt-2 mb-2 w-[55%] p-3 rounded-2xl";

              const innerDiv = document.createElement("div");
              innerDiv.className = "text-Dred";
              innerDiv.textContent = data[i].username;

              const commentDiv = document.createElement("div");
              commentDiv.textContent = data[i].comment;

              newDiv.appendChild(innerDiv);
              newDiv.appendChild(commentDiv);

              document
                .getElementById("maincommentContainer")
                .appendChild(newDiv);
            }
          }
        });
      });
    }
  }

  return (
    <>
      <p className="flex bg-mainBoxes text-3xl text-Written justify-center">
        Product Review
      </p>
      <div
        id="maincommentContainer"
        className="flex flex-col flex-wrap items-center justify-start  bg-write2"
      >
        <div className="flex w-[55%] mt-5 items-baseline">
          <textarea
            type="text"
            id="text"
            placeholder="Write a Product Review...."
            className="w-[95%] h-[80px] bg-write2 border-2 text-Written p-5 rounded-2xl"
          ></textarea>
          <button
            type="button"
            onClick={submitReview}
            className="rounded-md ml-4 h-[40px] bg-btnC px-3 py-2 text-sm font-semibold text-Written shadow-sm hover:bg-red-500 hover:text-black focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
          >
            Submit
          </button>
        </div>
        {allreviews.map((ele, index) => (
          <div
            key={index}
            className="bg-mainBoxes text-Written mt-2 mb-2 w-[55%] p-3 rounded-2xl"
          >
            <div className="text-Dred">{ele.username}</div>
            <div>{ele.comment}</div>
          </div>
        ))}
      </div>
    </>
  );
}
export default ProductReview;
