import { useEffect, useMemo } from 'react';
import { useInfiniteQuery } from 'react-query';
import Slider, { Settings } from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { useInView } from 'react-intersection-observer';
import { getGenres } from '../../queries/genre.query';
import { Genre } from './genre';

export function GenreCarousel({ searchTerm }: { searchTerm?: string }) {
    const limit = 10;
    const {
        data: genres,
        isLoading: artistsLoading,
        fetchNextPage,
    } = useInfiniteQuery({
        queryKey: ['genres', { searchTerm }],
        queryFn: async ({ pageParam = 0 }) => getGenres({ name: searchTerm, skip: pageParam as number, limit }),
        getNextPageParam: (_, allPages) => allPages.length * limit,
    });

    const { ref: inViewRef, entry: inViewEntry } = useInView({ delay: 100 });

    useEffect(() => {
        if (inViewEntry?.isIntersecting) {
            fetchNextPage();
        }
    }, [inViewEntry?.isIntersecting]);

    const flattenedGenres = useMemo(() => genres?.pages.flat() ?? [], [genres]);

    const settings: Settings = useMemo(
        () => ({
            swipeToSlide: true,
            infinite: false,
            initialSlide: 0,
            arrows: false,
            className: 'genres-carousel',
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
            {flattenedGenres.map((genre, index) => (
                <span ref={index === flattenedGenres.length - 1 ? inViewRef : null} key={index}>
                    <Genre {...genre} />
                </span>
            ))}
        </Slider>
    );
}
