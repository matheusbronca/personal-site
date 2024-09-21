<script lang="ts">
  import emblaCarouselSvelte from "embla-carousel-svelte";
  import GalleryImg from "./components/GalleryImg.svelte";
  import ArrowIcon from "./components/ArrowIcon.svelte";
  import { modal } from "./actions/ModalAction";
  import { fade, fly } from "svelte/transition";
  import type { EmblaCarouselType } from "embla-carousel";

  type ImgType = {
    src: string;
    mobileSrc?: string;
    altText?: string;
  };
  export let imgs: ImgType[] | undefined = undefined;

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

  const openImageViewer = (el) => {
    console.log(el);
    showModal = 1;
  };

  let showModal: number | undefined;
</script>

{#if imgs?.length}
  <div
    class="embla rounded-lg mb-10 mx-auto relative overflow-hidden max-w-full not-prose"
    use:emblaCarouselSvelte={emblaParams}
    on:emblaInit={onInit}
  >
    <div class="embla__container w-full max-w-full h-auto object-cover gap-2">
      {#each imgs as img, index}
        <div
          class="embla__slide embla__lazy-load rounded-lg overflow-hidden aspect-ig-story max-w-1/3"
        >
          <button class="aspect-ig-story" on:click={openImageViewer}>
            <GalleryImg
              class="aspect-ig-story"
              src={img.src}
              mobileSrc={img.mobileSrc}
              inView={slidesInView.indexOf(index) > -1}
              altText={img.altText}
              {index}
            />
          </button>
        </div>
      {/each}
    </div>
    <div class="flex justify-between items-center pt-2 w-full">
      <div class="pl-0 flex items-center">
        <button class="embla__prev size-min" on:click={scrollPrev}
          ><ArrowIcon class="dark:text-white/70 text-black/80" /></button
        >
        <button class="embla__next size-min" on:click={scrollNext}
          ><ArrowIcon class="rotate-180 dark:text-white/70 text-black/70" />
        </button>
      </div>
      <div class="text-xs dark:text-white/70 text-black/70 pr-2">
        {currentSlideIndex + 1}/{slidesLength}
      </div>
    </div>
  </div>
  {#if !!showModal}
    <div
      class="flex flex-col h-full w-max mx-auto items-center justify-center"
      use:modal={{
        selector: "body",
        backdropClass:
          "animate-fadein dark:bg-black/80 bg-white/60 backdrop-blur-sm fixed size-full z-50 backdrop",
        onClickOutside: (event) => {
          console.log("cliquei!");
          showModal = undefined;
        },
        onEscape: () => (showModal = undefined),
      }}
    >
      <div
        transition:fly={{ y: 10 }}
        class="max-h-[100vh] aspect-ig-story flex flex-col items-center justify-center my-10 relative"
      >
        <button
          on:click={() => {
            showModal = undefined;
            const backdrop = document.querySelector(".backdrop");
            if (!backdrop) return;

            backdrop.classList.add("delay-100");
            backdrop.classList.add("duration-300");
            backdrop.classList.add("opacity-0");
          }}
          class="absolute right-6 top-2 group w-fit flex p-1 flex-nowrap rounded-full border border-white/20 hover:bg-black/70 text-white/50 hover:text-white transition-colors duration-300 ease-in-out text-xs bg-black/40 aspect-square items-center"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            class="size-4"
            ><path
              stroke="currentColor"
              stroke-linecap="round"
              stroke-width="2"
              d="M5 19L19 4.99996"
            /><path
              stroke="currentColor"
              stroke-linecap="round"
              stroke-width="2"
              d="M19 19L4.99996 4.99996"
            /></svg
          >
        </button>
        <GalleryImg
          class="aspect-ig-story object-cover h-full w-min rounded-md"
          src={imgs[showModal].src}
          mobileSrc={imgs[showModal].mobileSrc}
          inView={true}
          altText={imgs[1].altText}
        />
        <div
          transition:fly={{ y: 10 }}
          class="text-sm text-center mt-2 aspect-[9] dark:text-white/80 text-black/80"
        >
          Essa é a legenda, uma legenda diz brevemente do que se trata uma
          imagem. Fique atento pois é uma legenda
        </div>
      </div>
    </div>
  {/if}
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
