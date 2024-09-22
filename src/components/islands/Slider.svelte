<script lang="ts">
  import emblaCarouselSvelte from "embla-carousel-svelte";
  import SlideImg from "./components/SlideImg.svelte";
  import ArrowIcon from "./components/ArrowIcon.svelte";
  import type { EmblaCarouselType } from "embla-carousel";

  type ImgType = {
    src: string;
    mobileSrc?: string;
    altText?: string;
  };
  export let imgs: ImgType[] | undefined = undefined;
  export let demoUrl: string | undefined = undefined;

  const imagesInView: number[] = [];

  let emblaApi: EmblaCarouselType;

  let slidesLength = 0,
    currentSlideIndex = 0;

  let emblaParams = {
    options: {
      loop: false,
    },
    plugins: [],
  };

  let slidesInView: number[] = [];

  const updateSlidesInView = (emblaApi: EmblaCarouselType) => {
    const hasLoadedAllImgs =
      slidesInView.length === emblaApi.slideNodes().length;

    if (hasLoadedAllImgs) emblaApi.off("slidesInView", updateSlidesInView);

    const inView = emblaApi
      .slidesInView()
      .filter((index) => !slidesInView.includes(index));

    slidesInView = slidesInView.concat(inView);
  };

  function onInit(event: CustomEvent<EmblaCarouselType>) {
    if (!event) return;
    emblaApi = event.detail;

    slidesLength = emblaApi.scrollSnapList().length;
    currentSlideIndex = emblaApi.selectedScrollSnap();

    emblaApi.on("init", () => {
      slidesLength = emblaApi.scrollSnapList().length;
      currentSlideIndex = emblaApi.selectedScrollSnap();
    });

    emblaApi.on("slidesInView", updateSlidesInView);
    emblaApi.on("reInit", updateSlidesInView);

    emblaApi.on("select", () => {
      slidesLength = emblaApi.scrollSnapList().length;
      currentSlideIndex = emblaApi.selectedScrollSnap();
    });
  }

  const scrollPrev = () => {
    if (emblaApi) emblaApi.scrollPrev();
  };

  const scrollNext = () => {
    if (emblaApi) emblaApi.scrollNext();
  };
</script>

{#if imgs?.length}
  <div
    class="animate embla rounded-lg mb-10 mx-auto relative overflow-hidden"
    use:emblaCarouselSvelte={emblaParams}
    on:emblaInit={onInit}
  >
    <div class="embla__container w-full h-[325px] object-cover gap-2">
      {#each imgs as img, index}
        <div class="embla__slide embla__lazy-load rounded-lg overflow-hidden">
          <SlideImg
            src={img.src}
            mobileSrc={img.mobileSrc}
            inView={slidesInView.indexOf(index) > -1}
            altText={img.altText}
            {index}
          />
        </div>
      {/each}
    </div>
    <div class="flex justify-between items-center pt-2 w-full">
      <div class="pl-0 flex items-center">
        <button class="embla__prev size-min" on:click={scrollPrev}
          ><ArrowIcon class="text-white/70" /></button
        >
        <button class="embla__next size-min" on:click={scrollNext}
          ><ArrowIcon class="rotate-180 text-white/70" />
        </button>
      </div>
      <div class="text-xs text-white/70">
        {currentSlideIndex + 1}/{!slidesLength ? 0 : slidesLength}
      </div>
      <a
        target="_blank"
        href={demoUrl}
        rel="external"
        class="relative group w-fit flex px-3 py-1.5 flex-nowrap rounded border border-white/20 hover:bg-white/5 text-white/70 hover:text-white transition-colors duration-300 ease-in-out text-xs"
      >
        <span
          class="size-1 bg-green-400 rounded-full animate-pulse absolute top-1 right-1"
        />Demo</a
      >
    </div>
  </div>
{/if}

<style>
  .embla {
    overflow: hidden;
  }
  .embla__container {
    display: flex;
  }
  .embla__slide {
    flex: 0 0 100%;
    min-width: 0;
  }

  .embla__lazy-load {
    position: relative;
    height: 100%;
  }
</style>
