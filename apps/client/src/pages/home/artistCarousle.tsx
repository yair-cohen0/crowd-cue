import { Artist } from './artist.tsx';
import { useEffect, useMemo } from 'react';
import { useInfiniteQuery } from 'react-query';
import { getArtists } from '../../queries/artist.query.ts';
import Slider, { Settings } from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { useInView } from 'react-intersection-observer';

export function ArtistCarousel({ searchTerm }: { searchTerm?: string }) {
    const limit = 10;
    const {
        data: artists,
        isLoading: artistsLoading,
        fetchNextPage,
    } = useInfiniteQuery({
        queryKey: ['artists', searchTerm],
        queryFn: async ({ pageParam = 0 }) => getArtists({ name: searchTerm, skip: pageParam as number, limit }),
        getNextPageParam: (_, allPages) => allPages.length * limit,
    });

    const { ref: inViewRef, entry: inViewEntry } = useInView({ delay: 100 });

    useEffect(() => {
        if (inViewEntry?.isIntersecting) {
            fetchNextPage();
        }
    }, [inViewEntry?.isIntersecting]);

    const flattenedArtists = useMemo(() => artists?.pages.flat() ?? [], [artists]);

    const settings: Settings = useMemo(
        () => ({
            swipeToSlide: true,
            infinite: false,
            initialSlide: 0,
            rows: 2,
            arrows: false,
            className: 'artists-carousel',
            responsive: [
                {
                    breakpoint: 3000,
                    settings: {
                        slidesToShow: 7,
                    },
                },
                {
                    breakpoint: 1024,
                    settings: {
                        slidesToShow: 5,
                    },
                },
                {
                    breakpoint: 464,
                    settings: {
                        slidesToShow: 3,
                    },
                },
            ],
        }),
        [],
    );

    return artistsLoading ? (
        <span>loading</span>
    ) : (
        <Slider {...settings}>
            {flattenedArtists.map((artist, index) => (
                <span ref={index === flattenedArtists.length - 1 ? inViewRef : null} key={artist.spotify_id}>
                    <Artist {...artist} />
                </span>
            ))}
        </Slider>
    );
}
