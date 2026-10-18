function GoogleMark({ size = 20 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" aria-label="Google">
      <path fill="#FFC107" d="M43.6 20.1H42V20H24v8h11.3C33.7 32.7 29.2 36 24 36c-6.6 0-12-5.4-12-12s5.4-12 12-12c3.1 0 5.8 1.2 7.9 3.1l5.7-5.7C34 6.1 29.3 4 24 4 12.9 4 4 12.9 4 24s8.9 20 20 20 20-8.9 20-20c0-1.3-.1-2.6-.4-3.9z"/>
      <path fill="#FF3D00" d="M6.3 14.7l6.6 4.8C14.7 15.1 19 12 24 12c3.1 0 5.8 1.2 7.9 3.1l5.7-5.7C34 6.1 29.3 4 24 4 16.3 4 9.7 8.3 6.3 14.7z"/>
      <path fill="#4CAF50" d="M24 44c5.2 0 9.9-2 13.4-5.2l-6.2-5.2C29.2 35.1 26.7 36 24 36c-5.2 0-9.6-3.3-11.3-7.9l-6.5 5C9.5 39.6 16.2 44 24 44z"/>
      <path fill="#1976D2" d="M43.6 20.1H42V20H24v8h11.3c-.8 2.2-2.2 4.2-4.1 5.6l6.2 5.2C37 39.2 44 34 44 24c0-1.3-.1-2.6-.4-3.9z"/>
    </svg>
  );
}

function Stars({ rating, size = 'text-base' }) {
  const filled = Math.round(rating || 0);
  return (
    <div className="flex gap-0.5" aria-label={`${rating} out of 5 stars`}>
      {[1, 2, 3, 4, 5].map(i => (
        <span
          key={i}
          className={`material-symbols-outlined filled ${size}`}
          style={{ color: i <= filled ? '#F5C200' : '#D8D2C4' }}
        >
          star
        </span>
      ))}
    </div>
  );
}

function ReviewCard({ review }) {
  return (
    <div className="rounded-2xl p-7 flex flex-col shadow-md" style={{ background: 'white' }}>
      <div className="flex items-center justify-between mb-4">
        <Stars rating={review.rating} />
        <GoogleMark size={18} />
      </div>

      <p className="font-body text-sm leading-relaxed flex-1 mb-6 line-clamp-[8]" style={{ color: '#5A5A6A' }}>
        {review.text}
      </p>

      <div className="flex items-center gap-3">
        {review.authorPhoto ? (
          <img
            src={review.authorPhoto}
            alt=""
            referrerPolicy="no-referrer"
            className="w-10 h-10 rounded-full object-cover flex-shrink-0"
          />
        ) : (
          <div className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0" style={{ background: '#0D1B2A' }}>
            <span className="font-headline font-bold text-xs" style={{ color: '#F5C200' }}>
              {review.author.charAt(0)}
            </span>
          </div>
        )}
        <div>
          {review.authorUrl ? (
            <a
              href={review.authorUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="font-headline font-bold text-sm hover:underline"
              style={{ color: '#0D1B2A' }}
            >
              {review.author}
            </a>
          ) : (
            <p className="font-headline font-bold text-sm" style={{ color: '#0D1B2A' }}>{review.author}</p>
          )}
          <p className="font-body text-xs" style={{ color: '#9A9AAA' }}>{review.when}</p>
        </div>
      </div>
    </div>
  );
}

export default function ReviewsSection({ google, settings }) {
  const reviewsUrl = google?.url || settings?.googleReviewsUrl;
  const reviews = google?.reviews || [];

  // Nothing real to show — hide the section rather than display placeholder reviews.
  if (reviews.length === 0 && !reviewsUrl) return null;

  return (
    <section id="reviews" style={{ background: '#FAF6EE' }}>
      <div className="container-xl section-padding">
        {/* Header */}
        <div className="text-center mb-14">
          <span className="section-label">Client Reviews</span>
          <h2 className="font-headline font-extrabold text-4xl md:text-5xl leading-tight" style={{ color: '#0D1B2A' }}>
            What Our Clients Say
          </h2>

          {google?.rating ? (
            <div className="inline-flex items-center gap-4 mt-8 rounded-2xl px-6 py-4 shadow-md" style={{ background: 'white' }}>
              <GoogleMark size={32} />
              <div className="text-left">
                <div className="flex items-center gap-2">
                  <span className="font-headline font-extrabold text-2xl" style={{ color: '#0D1B2A' }}>
                    {google.rating.toFixed(1)}
                  </span>
                  <Stars rating={google.rating} size="text-lg" />
                </div>
                <p className="font-body text-xs" style={{ color: '#5A5A6A' }}>
                  Based on {google.total} Google {google.total === 1 ? 'review' : 'reviews'}
                </p>
              </div>
            </div>
          ) : (
            <p className="font-body text-lg mt-4 max-w-xl mx-auto" style={{ color: '#5A5A6A' }}>
              Read what our clients say about working with us on Google.
            </p>
          )}
        </div>

        {/* Review cards */}
        {reviews.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {reviews.map(r => (
              <ReviewCard key={r.id} review={r} />
            ))}
          </div>
        )}

        {/* Link to Google profile */}
        {reviewsUrl && (
          <div className="text-center mt-12">
            <a
              href={reviewsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 font-headline font-bold text-base rounded-xl px-6 py-3.5 transition-colors"
              style={{ background: '#0D1B2A', color: 'white' }}
            >
              <GoogleMark size={20} />
              Read all reviews on Google
              <span className="material-symbols-outlined text-xl">arrow_outward</span>
            </a>
          </div>
        )}
      </div>
    </section>
  );
}
