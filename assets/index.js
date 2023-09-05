document.addEventListener('DOMContentLoaded', (e) => {
  // Accordion
  (function () {
    const accordions = document.querySelectorAll('.accordion');

    accordions.forEach((accordion, index) => {
      const accordionBlock = accordion.querySelector('.accordion-block');
      const accordionHeader = accordion.querySelector('.accordion-block__header');

      if (!accordionHeader) {
        return;
      }

      accordionHeader.addEventListener('click', () => {
        console.log('aklsdjalksjdlkasdj');

        if (accordionBlock.classList.contains('accordion-block--open')) {
          accordionBlock.classList.remove('accordion-block--open');
          return;
        }

        if (!accordionBlock.classList.contains('accordion-block--open')) {
          accordionBlock.classList.add('accordion-block--open');
        }
      });

    });

  })();

  // Tooltip
  (function () {
    const tags = document.querySelectorAll('.tag-block');

    const createTooltip = (text, coords, index) => {
      const tooltip = document.createElement('div');
      const tooltipText = document.createElement('p');
      const tooltipTriangle = document.createElement('div');

      tooltip.classList.add('t-tooltip');
      tooltip.setAttribute('tooltip-id', index);
      tooltipTriangle.classList.add('t-tooltip__triangle');

      tooltipText.insertAdjacentText('afterbegin', text);

      tooltip.appendChild(tooltipText);
      tooltip.appendChild(tooltipTriangle);
      document.body.append(tooltip);

      let widthTriangle = 24;
      let heightTriangle = 12.5;

      tooltip.style.cssText = `
        max-width: ${coords.parentTagsBlockWidth - 14 - 16}px;
        top: ${coords.tagPosBottom + heightTriangle - 1}px;
        left: ${coords.parentTagsBlockPosLeft + 14}px;
        width: ${coords.parentTagsBlockWidth - 28}px;
      `;

      tooltipTriangle.style.cssText = `
        top: ${coords.tagPosBottom}px;
        left: ${coords.tagPosLeft + coords.tagWidth - coords.paddingRight - coords.iconWidth / 2 - widthTriangle / 2}px;
      `;

      tooltip.classList.add('t-tooltip--visible');
    }

    const removeTooltip = () => {
      const tooltips = document.querySelectorAll('.t-tooltip');

      tooltips.forEach((tooltip) => {
        tooltip.remove();
      });
    }

    tags.forEach((tag, tagIndex) => {
      const iconBtn = tag.querySelector('img[data-action="show-tooltip"]');
      const tagBlockBody = tag.querySelector('.tag-block__body');
      const parentTagsBlock = tag.closest('.tags-block');

      if (!iconBtn && !tagBlockBody) {
        return;
      }

      const tagBodyText = tagBlockBody.children[0].innerHTML;

      const getCoordsFromTagBlock = () => {
        let coords = {
          parentTagsBlockWidth: parentTagsBlock.getBoundingClientRect().width,
          parentTagsBlockPosCenter: parentTagsBlock.getBoundingClientRect().right - parentTagsBlock.getBoundingClientRect().width / 2,
          parentTagsBlockPosLeft: parentTagsBlock.getBoundingClientRect().left,
          tagWidth: tag.getBoundingClientRect().width,
          tagPosBottom: tag.getBoundingClientRect().bottom,
          tagPosLeft: tag.getBoundingClientRect().left,
          tagPosRight: tag.getBoundingClientRect().right,
          iconWidth: iconBtn.getBoundingClientRect().width,
          paddingRight: 8,
        }

        return coords;
      }

      iconBtn.addEventListener('mouseover', () => createTooltip(tagBodyText, getCoordsFromTagBlock(), tagIndex));

      iconBtn.addEventListener('mouseout', () => removeTooltip());

      document.addEventListener('scroll', () => removeTooltip());

    });

  })();

  // Mobile Setting
  (function () {
    const windowInnerWidth = window.innerWidth;

    const mobileSetting = (width) => {
      if (width > 1200) {
        document.querySelectorAll('.tag-block > .tag-block__header > img').forEach((icon) => {
          icon.style.display = 'block';
        });
      }

      if (width <= 1200) {
        document.querySelectorAll('.tag-block > .tag-block__header > img').forEach((icon) => {
          icon.style.display = 'none';
        });
      }

      if (width <= 576) {
        document.querySelectorAll('.accordion-block').forEach((accordion, index) => {
          if (index !== 0) {
            accordion.classList.remove('accordion-block--open');
          }
        });
      }
    }

    window.addEventListener('resize', (e) => {
      mobileSetting(e.target.innerWidth);
    });

    mobileSetting(windowInnerWidth);

  })();
});