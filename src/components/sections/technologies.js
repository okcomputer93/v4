import React, { useEffect, useRef } from 'react';
import { CSSTransition } from 'react-transition-group';
import styled from 'styled-components';
import { useMediaQuery } from 'react-responsive';
import { srConfig, technologies } from '@config';
import { loaderDelay } from '@utils';
import sr from '@utils/sr';
import { usePrefersReducedMotion } from '@hooks';
import { TagCloud } from '@components';
import { useTranslation } from 'react-i18next';

const StyledJobsSection = styled.section`
  max-width: 700px;
  margin-bottom: 80px;

  @media (max-width: 700px) {
    margin-bottom: 400px;
  }

  .inner {
    display: block;

    // Prevent container from jumping
    @media (min-width: 700px) {
      min-height: 340px;
    }
  }
`;

const Technologies = () => {
  const revealContainer = useRef(null);
  const prefersReducedMotion = usePrefersReducedMotion();
  const isMobile = useMediaQuery({ query: '(max-width: 700px)' });
  const radius = isMobile ? 140 : 200;
  const { t } = useTranslation();

  useEffect(() => {
    if (prefersReducedMotion) {
      return;
    }

    sr.reveal(revealContainer.current, srConfig());
  }, []);

  return (
    <StyledJobsSection id="technologies" ref={revealContainer}>
      <h2 className="numbered-heading">{t('technologies-title')}</h2>

      <div className="inner">
        <div>{t('technologies-desc')}</div>
        <CSSTransition classNames="fadeDownClass" timeout={loaderDelay}>
          <TagCloud tagName={technologies} radius={radius}></TagCloud>
        </CSSTransition>
      </div>
    </StyledJobsSection>
  );
};

export default Technologies;
