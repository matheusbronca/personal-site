<script lang="ts">
  export let src: string,
    mobileSrc: string | undefined = undefined,
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
</script>

{#if !hasLoaded}
  <span class="embla__lazy-load__spinner" data-index={index}></span>
{/if}
<picture
  {...$$restProps}
  class:hasLoaded
  class={`lazyLoadImg ${$$restProps.class}`}
>
  <source
    type="image/webp"
    srcset={inView ? getWebPSource(src) : PLACEHOLDER_SRC}
  />
  {#if mobileSrc}
    <source
      srcset={inView ? getWebPSource(mobileSrc) : PLACEHOLDER_SRC}
      type="image/webp"
      media="(orientation: portrait)"
    />
    <source
      srcset={inView ? mobileSrc : PLACEHOLDER_SRC}
      media="(orientation: portrait)"
    />
  {/if}
  <img
    on:load={() => {
      hasLoaded = true;
    }}
    src={inView ? src : PLACEHOLDER_SRC}
    alt={altText}
    class={`size-full object-cover`}
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
