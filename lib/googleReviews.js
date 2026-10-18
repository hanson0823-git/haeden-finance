// Fetches the business rating and reviews from the Google Places API (New).
// Requires GOOGLE_PLACES_API_KEY and GOOGLE_PLACE_ID env vars; returns null when
// either is missing or the request fails, so callers can fall back gracefully.

const FIELD_MASK = 'rating,userRatingCount,googleMapsUri,reviews';

export async function getGoogleReviews() {
  const apiKey = process.env.GOOGLE_PLACES_API_KEY;
  const placeId = process.env.GOOGLE_PLACE_ID;
  if (!apiKey || !placeId) return null;

  try {
    const res = await fetch(
      `https://places.googleapis.com/v1/places/${encodeURIComponent(placeId)}?languageCode=en`,
      {
        headers: { 'X-Goog-Api-Key': apiKey, 'X-Goog-FieldMask': FIELD_MASK },
        next: { revalidate: 21600 }, // refresh every 6 hours
      }
    );
    if (!res.ok) {
      console.error('Google Places error:', res.status, await res.text());
      return null;
    }
    const data = await res.json();

    return {
      rating: data.rating ?? null,
      total: data.userRatingCount ?? 0,
      url: data.googleMapsUri ?? null,
      reviews: (data.reviews || []).map((r, i) => ({
        id: r.name || String(i),
        rating: r.rating,
        text: r.originalText?.text || r.text?.text || '',
        when: r.relativePublishTimeDescription || '',
        author: r.authorAttribution?.displayName || 'Google user',
        authorUrl: r.authorAttribution?.uri || null,
        authorPhoto: r.authorAttribution?.photoUri || null,
      })),
    };
  } catch (err) {
    console.error('Google Places fetch failed:', err.message);
    return null;
  }
}

// Whether the reviews section has anything to show (used to hide the nav link).
export function hasReviews(google, settings) {
  return Boolean(google?.reviews?.length || google?.url || settings?.googleReviewsUrl);
}
