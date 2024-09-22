<script lang="ts">
  import { Image, Source } from "@unpic/svelte";

  export let src: string,
    altText: string | undefined = undefined,
    index: number | undefined = undefined,
    inView: boolean;

  const PLACEHOLDER_SRC = `data:image/gif;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs%3D`;

  let hasLoaded = false;

  const getWebPSource = (src: string) => {
    const parts = src.split(".");
    const path = parts[0];
    return `${path}.webp`;
  };

  const setLoaded = ({ target }: Event) => {
    hasLoaded = (target as HTMLImageElement).src !== PLACEHOLDER_SRC;
  };
</script>

{#if !hasLoaded}
  <span class="embla__lazy-load__spinner z-20" data-index={index}></span>
{/if}
<picture
  {...$$restProps}
  class:hasLoaded
  class={`lazyLoadImg animate-shimmer bg-[linear-gradient(110deg,#fafafa,45%,#dbdbdb,55%,#fafafa)] dark:bg-[linear-gradient(110deg,#000103,45%,#1e2631,55%,#000103)] bg-[length:200%_100%] ${$$restProps.class}`}
>
  <Source
    type="image/webp"
    src={inView ? getWebPSource(src) : PLACEHOLDER_SRC}
    width={498}
    aspectRatio={9 / 16}
  />
  <Image
    class={`${hasLoaded ? "hasLoaded" : ""} rounded-lg`}
    on:load={setLoaded}
    src={inView ? src : PLACEHOLDER_SRC}
    width={498}
    aspectRatio={9 / 16}
    alt={altText}
    data-index={index}
    data-src={src}
  />
</picture>

<style>
  .embla__lazy-load__spinner {
    border: 0.15rem solid rgb(229, 231, 235);
    border-left: 0.15rem solid black;
    font-size: 1rem;
    display: inline-flex;
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    margin: auto;
    text-indent: -9999em;
    animation: loading 1.1s infinite linear;
    border-radius: 50%;
    width: 2rem;
    height: 2rem;
  }
  .embla__lazy-load__spinner:after {
    border-radius: inherit;
    width: 2rem;
    height: 2rem;
  }

  .lazyLoadImg {
    opacity: 0;
    transition: opacity 0.2s ease-in-out;
  }
  .lazyLoadImg.hasLoaded {
    opacity: 1;
  }
  @keyframes loading {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
</style>
