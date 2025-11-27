import { useState } from "react";
import { Star } from "lucide-react";

export default function Reviews({ reviews }) {
const [newReview, setNewReview] = useState({ name: "", rating: 0, comment: "" });
const [allReviews, setAllReviews] = useState(reviews);

const averageRating = Math.round(allReviews.reduce((sum, r) => sum + r.rating, 0) / allReviews.length);

const submitReview = (e) => {
e.preventDefault();
if (newReview.name && newReview.rating && newReview.comment) {
setAllReviews([newReview, ...allReviews]);
setNewReview({ name: "", rating: 0, comment: "" });
}
};

return ( <div className="mb-24"> <h2 className="text-4xl font-bold mb-4">Customer Reviews</h2>

  {/* Average Rating */}
  <div className="flex items-center mb-8 gap-2">
    {[...Array(5)].map((_, i) => (
      <Star key={i} className={`w-6 h-6 ${i < averageRating ? "text-white fill-current" : "text-white/40"}`} />
    ))}
    <span className="text-white/60 ml-2">{averageRating}.0 ({allReviews.length} reviews)</span>
  </div>

  {/* Filter Buttons (optional for future) */}
  {/* <div className="flex gap-2 mb-6">
    <button className="px-3 py-1 bg-white/10 rounded-full text-white">All</button>
    <button className="px-3 py-1 bg-white/10 rounded-full text-white">5 Stars</button>
    <button className="px-3 py-1 bg-white/10 rounded-full text-white">4 Stars</button>
  </div> */}

  {/* Reviews Grid */}
  <div className="grid md:grid-cols-3 gap-6 mb-12">
    {allReviews.map((review, idx) => (
      <div key={idx} className="bg-black/80 backdrop-blur-sm border border-white/20 rounded-2xl p-6">
        <div className="flex items-center gap-4 mb-4">
          <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center font-bold text-lg">
            {review.name.charAt(0)}
          </div>
          <div>
            <div className="font-semibold">{review.name}</div>
            <div className="text-sm text-white/40">{review.date || "Just now"}</div>
          </div>
        </div>
        <div className="flex mb-3">
          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              className={`w-5 h-5 ${i < review.rating ? "text-white fill-current" : "text-white/20"}`}
            />
          ))}
        </div>
        <p className="text-white/70 leading-relaxed">{review.comment || review.text}</p>
      </div>
    ))}
  </div>

  {/* Add Review Form */}
  <form onSubmit={submitReview} className="bg-black/80 p-6 rounded-2xl border border-white/20 space-y-4">
    <h3 className="text-xl font-bold">Add a Review</h3>
    <input
      type="text"
      placeholder="Your Name"
      value={newReview.name}
      onChange={(e) => setNewReview({ ...newReview, name: e.target.value })}
      className="w-full p-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-white/50"
      required
    />

    {/* Clickable Star Rating */}
    <div className="flex gap-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          className={`w-6 h-6 cursor-pointer transition ${
            star <= newReview.rating ? "text-white fill-current" : "text-white/40"
          }`}
          onClick={() => setNewReview({ ...newReview, rating: star })}
        />
      ))}
    </div>

    <textarea
      placeholder="Your Review"
      value={newReview.comment}
      onChange={(e) => setNewReview({ ...newReview, comment: e.target.value })}
      className="w-full p-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-white/50"
      required
    />
    <button
      type="submit"
      className="bg-white text-black py-3 px-6 rounded-xl font-bold hover:bg-white/90 transition"
    >
      Submit Review
    </button>
  </form>
</div>

);
}
