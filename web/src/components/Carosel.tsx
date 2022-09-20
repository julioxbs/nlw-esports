import "keen-slider/keen-slider.min.css";
import { useKeenSlider } from "keen-slider/react";
import { GamerBanner } from "./GamerBanner"
import { useState } from "react"
import { ListOfGames } from "../App"

const animation = { duration: 5000, easing: (t: number) => t }

export function Carosel(props: { listOfGames: ListOfGames[] }) {
    const [sliderOn, setSliderOn] = useState(false);
    const [sliderRef, instanceRef] = useKeenSlider(
        {
            slideChanged() {
                console.log('slide changed')
            },
            renderMode: "performance",
            initial: 0,
            loop: true,
            created(s) {
                s.moveToIdx(5, true, animation)
            },
            updated(s) {
                s.moveToIdx(s.track.details.abs + 5, true, animation)
            },
            animationEnded(s) {
                s.moveToIdx(s.track.details.abs + 5, true, animation)
            },
            mode: "free-snap",
            breakpoints: {
                '(min-width: 770px)': {
                    slides: {
                        perView: 5,
                        spacing: 15,
                    }
                },
                '(max-width: 768px)': {
                    slides: {
                        perView: 3,
                        spacing: 15,
                    }
                },
                '(max-width: 375px)': {
                    slides: {
                        perView: 2,
                        spacing: 15,
                    }
                }
            }
        },
        [
            // add plugins here
            slider => {
                slider.on('created', () => {
                    setSliderOn(!sliderOn);
                })
            },
        ]
    )

    return (
        <div ref={sliderRef} className="keen-slider mt-16">
            {sliderOn && props.listOfGames.map((games) => (
                <GamerBanner
                    key={games.id}
                    id={games.id}
                    title={games.title}
                    bannerURL={games.bannerURL}
                    adsCount={games._count.Advertisements} />
            ))}
        </div>
    )
}