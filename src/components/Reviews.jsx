import { useMemo, useState, useEffect, useCallback } from 'react';
import FadeIn from './FadeIn';
import { useLanguage } from '../context/LanguageContext';

const GOOGLE_REVIEWS_URL =
	'https://www.google.com/maps/place/Boiani+Beach/@43.8235515,13.0314751,14.05z/data=!4m8!3m7!1s0x132d11f32260f07d:0x8eb5b2e668f2481a!8m2!3d43.8164475!4d13.0738146!9m1!1b1!16s%2Fg%2F11b7f28f8l?authuser=0&entry=ttu&g_ep=EgoyMDI2MDUwNi4wIKXMDSoASAFQAw%3D%3D';

// Edit this list manually with the reviews you want to display.
const MANUAL_REVIEWS = [
	{
		id: 'manual-1',
		author_name: 'Marco B.',
		rating: 5,
		text: 'Posto stupendo, mare pulito e staff gentilissimo. Pranzo di pesce davvero ottimo.',
		timestamp: '2026-05-08T11:30:00.000Z',
	},
	{
		id: 'manual-2',
		author_name: 'Giulia R.',
		rating: 5,
		text: 'Atmosfera familiare e tramonto bellissimo. Consigliatissimo per una giornata in relax.',
		timestamp: '2026-05-06T16:15:00.000Z',
	},
	{
		id: 'manual-3',
		author_name: 'Andrew M.',
		rating: 4,
		text: 'Great beach club, very welcoming people and tasty seafood. Will come back next summer.',
		timestamp: '2026-05-04T13:45:00.000Z',
	},
	{
		id: 'manual-4',
		author_name: 'Elena T.',
		rating: 5,
		text: 'Servizi curati, lettini comodi e bar top. Perfetto anche per famiglie con bambini.',
		timestamp: '2026-05-02T09:20:00.000Z',
	},
	{
		id: 'manual-5',
		author_name: 'Luca V.',
		rating: 4,
		text: 'Bella esperienza al ristorantino, fritto misto leggero e buon vino locale.',
		timestamp: '2026-04-30T19:05:00.000Z',
	},
	{
		id: 'manual-6',
		author_name: 'Sofia D.',
		rating: 5,
		text: 'Personale sempre sorridente e disponibile. Ci siamo sentiti davvero come a casa.',
		timestamp: '2026-04-27T15:40:00.000Z',
	},
];

function getAuthorName(review) {
	return review.author_name || review.authorName || 'Guest';
}

function getReviewText(review) {
	return review.text || review.comment || '';
}

function parseReviewTime(rawValue) {
	if (!rawValue) return 0;
	if (typeof rawValue === 'number') {
		return rawValue > 10_000_000_000 ? rawValue : rawValue * 1000;
	}
	const parsed = Date.parse(rawValue);
	return Number.isNaN(parsed) ? 0 : parsed;
}

function normalizeReviews(payload) {
	const source = Array.isArray(payload) ? payload : payload?.reviews;
	if (!Array.isArray(source)) return [];

	return source
		.map((review) => {
			const timestamp = parseReviewTime(review.time || review.timestamp || review.createdAt);
			return {
				id:
					review.review_id ||
					review.reviewId ||
					review.id ||
					`${getAuthorName(review)}-${timestamp}`,
				authorName: getAuthorName(review),
				rating: Number(review.rating) || 0,
				text: getReviewText(review),
				timeDescription:
					review.relative_time_description || review.relativeTimeDescription || review.timeDescription,
				timestamp,
				profilePhoto:
					review.profile_photo_url || review.profilePhotoUrl || review.author_photo_url || '',
			};
		})
		.filter((review) => review.text)
		.sort((a, b) => b.timestamp - a.timestamp)
		.slice(0, 10);
}

function Stars({ rating }) {
	const full = Math.max(0, Math.min(5, Math.round(rating)));
	return (
		<div className="flex items-center gap-1" aria-label={`${full} out of 5 stars`}>
			{Array.from({ length: 5 }).map((_, index) => (
				<span key={index} className={index < full ? 'text-amber-400' : 'text-gray-300'}>
					★
				</span>
			))}
		</div>
	);
}

export default function Reviews() {
	const { t, lang } = useLanguage();
	const [currentIndex, setCurrentIndex] = useState(0);
	const [autoPlay, setAutoPlay] = useState(true);

	const reviews = useMemo(() => normalizeReviews(MANUAL_REVIEWS), []);

	const dateFormatter = useMemo(
		() =>
			new Intl.DateTimeFormat(lang === 'it' ? 'it-IT' : 'en-US', {
				day: '2-digit',
				month: 'short',
				year: 'numeric',
			}),
		[lang],
	);

	const goNext = useCallback(() => {
		setCurrentIndex((i) => (i + 1) % reviews.length);
	}, [reviews.length]);

	const goPrev = useCallback(() => {
		setCurrentIndex((i) => (i - 1 + reviews.length) % reviews.length);
	}, [reviews.length]);

	const goToIndex = useCallback((index) => {
		setCurrentIndex(index);
		setAutoPlay(false);
	}, []);

	// Auto-rotate every 5 seconds
	useEffect(() => {
		if (!autoPlay || reviews.length === 0) return;

		const timer = setTimeout(() => {
			setCurrentIndex((i) => (i + 1) % reviews.length);
		}, 5000);

		return () => clearTimeout(timer);
	}, [autoPlay, reviews.length, currentIndex]);

	// Resume autoplay on mouse leave
	const handleMouseLeave = useCallback(() => {
		setAutoPlay(true);
	}, []);

	if (reviews.length === 0) {
		return (
			<section id="reviews" className="py-12 md:py-16 px-4 bg-white">
				<div className="max-w-7xl mx-auto">
					<FadeIn className="text-center mb-10">
						<p className="text-sea font-medium text-sm uppercase tracking-widest mb-2">
							{t('reviews_label')}
						</p>
						<h2 className="text-3xl md:text-4xl font-heading font-bold text-gray-900">
							{t('reviews_title')}
						</h2>
					</FadeIn>

					<FadeIn className="max-w-2xl mx-auto text-center rounded-2xl border border-gray-200 p-6 bg-gray-50/50">
						<p className="text-gray-700 mb-3 text-sm">
							{t('reviews_empty')}
						</p>
						<a
							href={GOOGLE_REVIEWS_URL}
							target="_blank"
							rel="noreferrer"
							className="inline-flex items-center justify-center px-4 py-2 text-sm rounded-full bg-sea text-white font-medium hover:bg-sea/90 transition-colors"
						>
							{t('reviews_cta')}
						</a>
					</FadeIn>
				</div>
			</section>
		);
	}

	const currentReview = reviews[currentIndex];

	return (
		<section id="reviews" className="py-12 md:py-16 px-4 bg-gradient-to-br from-gray-50 to-white">
			<div className="max-w-5xl mx-auto">
				<FadeIn className="text-center mb-10">
					<p className="text-sea font-medium text-sm uppercase tracking-widest mb-2">
						{t('reviews_label')}
					</p>
					<h2 className="text-3xl md:text-4xl font-heading font-bold text-gray-900">
						{t('reviews_title')}
					</h2>
				</FadeIn>

				{/* Carousel Container */}
				<div
					className="relative rounded-3xl overflow-hidden shadow-xl bg-white"
					onMouseEnter={() => setAutoPlay(false)}
					onMouseLeave={handleMouseLeave}
				>
					{/* Review Cards - Smooth transition */}
					<div className="min-h-[280px] md:min-h-[320px] flex items-center justify-center p-6 md:p-8">
						<div className="w-full max-w-2xl">
							{/* Fade transition on review change */}
							<div
								key={currentReview.id}
								className="animate-fadeInScale"
							>
								{/* Author & Google Badge */}
								<div className="flex items-center justify-between gap-3 mb-4">
									<div className="flex items-center gap-3">
										{currentReview.profilePhoto ? (
											<img
												src={currentReview.profilePhoto}
												alt={currentReview.authorName}
												className="w-12 h-12 rounded-full object-cover border-2 border-sea/20"
												loading="lazy"
											/>
										) : (
											<div className="w-12 h-12 rounded-full bg-gradient-to-br from-sea to-sea/70 text-white flex items-center justify-center text-lg font-bold">
												{currentReview.authorName.slice(0, 1).toUpperCase()}
											</div>
										)}
										<div>
											<p className="font-semibold text-gray-900 text-base">
												{currentReview.authorName}
											</p>
											<p className="text-xs text-gray-500">
												{currentReview.timestamp > 0
													? dateFormatter.format(currentReview.timestamp)
													: currentReview.timeDescription || t('reviews_no_date')}
											</p>
										</div>
									</div>
									<img
										src="https://www.gstatic.com/images/branding/product/1x/maps_24dp.png"
										alt="Google"
										className="w-5 h-5"
										loading="lazy"
									/>
								</div>

								{/* Stars */}
								<div className="flex items-center gap-1 mb-3">
									<Stars rating={currentReview.rating} />
									<span className="text-xs text-gray-600 ml-1">
										{currentReview.rating.toFixed(1)}
									</span>
								</div>

								{/* Review Text */}
								<p className="text-gray-700 text-sm md:text-base leading-relaxed italic">
									"{currentReview.text}"
								</p>
							</div>
						</div>
					</div>

				</div>

				{/* Dot Navigation */}
				{reviews.length > 1 && (
					<div className="flex items-center justify-center gap-3 mt-6">
						<button
							onClick={() => {
								goPrev();
								setAutoPlay(false);
							}}
							className="w-7 h-7 rounded-full border border-gray-300 text-sea hover:border-sea hover:bg-sea/10 flex items-center justify-center transition-colors"
							aria-label="Previous review"
						>
							<svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
								<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.25} d="M15 19l-7-7 7-7" />
							</svg>
						</button>

						<div className="flex items-center gap-2">
						{reviews.map((_, index) => (
							<button
								key={index}
								onClick={() => goToIndex(index)}
								className={`transition-all duration-300 rounded-full ${
									index === currentIndex
										? 'bg-sea w-10 h-2'
										: 'bg-gray-300 hover:bg-gray-400 w-2 h-2'
								}`}
								aria-label={`Go to review ${index + 1}`}
							/>
						))}
						</div>

						<button
							onClick={() => {
								goNext();
								setAutoPlay(false);
							}}
							className="w-7 h-7 rounded-full border border-gray-300 text-sea hover:border-sea hover:bg-sea/10 flex items-center justify-center transition-colors"
							aria-label="Next review"
						>
							<svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
								<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.25} d="M9 5l7 7-7 7" />
							</svg>
						</button>
					</div>
				)}

				{/* Review Counter */}
				{reviews.length > 1 && (
					<p className="text-center text-xs text-gray-500 mt-3">
						{currentIndex + 1} / {reviews.length}
					</p>
				)}
			</div>
		</section>
	);
}
