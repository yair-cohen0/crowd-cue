import { Artist } from './artist.tsx';
import { useCallback, useMemo } from 'react';
import { useInfiniteQuery } from 'react-query';
import { getArtists } from '../../queries/artist.query.ts';
import type { Swiper as SwiperClass, SwiperOptions } from 'swiper/types';
import { Swiper, SwiperSlide } from 'swiper/react';
import { FreeMode, Grid } from 'swiper/modules';
import 'swiper/css';
import 'swiper/swiper-bundle.css';
import 'swiper/css/free-mode';

export function ArtistCarousel({ searchTerm }: { searchTerm?: string }) {
    const rows = 2;
    const responsiveConfig: SwiperOptions['breakpoints'] = useMemo(
        () => ({
            2000: {
                slidesPerView: 9,
            },
            1024: {
                slidesPerView: 7,
            },
            0: {
                slidesPerView: 3,
            },
        }),
        [],
    );

    function findNearestAndRoundDown(target: number, numbers: number[]) {
        return Math.max(...numbers.filter((num) => num <= target));
    }

    const slidesToFetch = useMemo(() => {
        const nearestWidth = findNearestAndRoundDown(window.innerWidth, Object.keys(responsiveConfig).map(Number));
        return +responsiveConfig[nearestWidth].slidesPerView * rows * 2;
    }, [responsiveConfig]);

    const fetchArtists = useCallback(
        ({ pageParam = 0 }) => getArtists({ name: searchTerm, skip: pageParam, limit: slidesToFetch }),
        [searchTerm, slidesToFetch],
    );

    const {
        data: artists,
        isLoading: artistsLoading,
        fetchNextPage,
    } = useInfiniteQuery({
        queryKey: ['artists', searchTerm],
        queryFn: fetchArtists,
        getNextPageParam: (_, allPages) => allPages.length * slidesToFetch,
    });

    const flattenedArtists = useMemo(() => artists?.pages.flat() ?? [], [artists]);

    const handleSlideChange = useCallback((swiper: SwiperClass) => {
        if (swiper.progress > 0.5) {
            fetchNextPage();
        }
    }, []);

    return artistsLoading ? (
        <span>loading</span>
    ) : (
        <Swiper
            grid={{
                rows,
                fill: 'column',
            }}
            touchRatio={1.5}
            resistance={true}
            resistanceRatio={0.6}
            spaceBetween={10}
            breakpoints={responsiveConfig}
            freeMode={true}
            modules={[FreeMode, Grid]}
            onSlideChange={(e) => handleSlideChange(e)}
        >
            {flattenedArtists.map((artist) => (
                <SwiperSlide
                    key={artist.spotifyId}
                    style={{
                        display: 'flex',
                        justifyContent: 'center',
                    }}
                >
                    <Artist {...artist} />
                </SwiperSlide>
            ))}
        </Swiper>
    );
}
