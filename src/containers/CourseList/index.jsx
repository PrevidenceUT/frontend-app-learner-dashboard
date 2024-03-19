// import React, { useRef, useState, useEffect } from 'react';
import React, { useRef, useEffect } from 'react';
// import debounce from 'lodash/debounce'; // Import debounce utility

import { useIntl } from '@edx/frontend-platform/i18n';
import { Pagination } from '@edx/paragon';

import { reduxHooks } from 'hooks';
import {
  ActiveCourseFilters,
  CourseFilterControls,
} from 'containers/CourseFilterControls';
import CourseCard from 'containers/CourseCard';
import arrowImage from 'assets/arrow.png';
import savedImage from 'assets/saved.png';
import NoCoursesView from './NoCoursesView';

import { useCourseListData, useIsCollapsed } from './hooks';

import messages from './messages';

import './index.scss';

export const CourseList = () => {
  const { formatMessage } = useIntl();
  const hasCourses = reduxHooks.useHasCourses();
  const {
    filterOptions,
    setPageNumber,
    numPages,
    showFilters,
    visibleList,
  } = useCourseListData();
  const isCollapsed = useIsCollapsed();

  const scrollContainerRef = useRef(null);
  const dragStartXRef = useRef(0);
  const scrollLeftRef = useRef(0);

  const scrollContainerRef1 = useRef(null);
  const dragStartXRef1 = useRef(0);
  const scrollLeftRef1 = useRef(0);

  const scrollContainerRef2 = useRef(null);
  const dragStartXRef2 = useRef(0);
  const scrollLeftRef2 = useRef(0);

  const handleDragMove = (e) => {
    const dragDistance = e.clientX - dragStartXRef.current;
    scrollContainerRef.current.scrollLeft = scrollLeftRef.current - dragDistance;
  };

  const handleDragEnd = () => {
    document.removeEventListener('mousemove', handleDragMove);
    document.removeEventListener('mouseup', handleDragEnd);
  };

  const handleDragStart = (e) => {
    dragStartXRef.current = e.clientX;
    scrollLeftRef.current = scrollContainerRef.current.scrollLeft;
    document.addEventListener('mousemove', handleDragMove);
    document.addEventListener('mouseup', handleDragEnd);
  };

  const handleDragMove1 = (e) => {
    const dragDistance1 = e.clientX - dragStartXRef1.current;
    scrollContainerRef1.current.scrollLeft = scrollLeftRef1.current - dragDistance1;
  };

  const handleDragEnd1 = () => {
    document.removeEventListener('mousemove', handleDragMove1);
    document.removeEventListener('mouseup', handleDragEnd1);
  };

  const handleDragStart1 = (e) => {
    dragStartXRef1.current = e.clientX;
    scrollLeftRef1.current = scrollContainerRef1.current.scrollLeft;
    document.addEventListener('mousemove', handleDragMove1);
    document.addEventListener('mouseup', handleDragEnd1);
  };

  const handleDragMove2 = (e) => {
    const dragDistance2 = e.clientX - dragStartXRef2.current;
    scrollContainerRef2.current.scrollLeft = scrollLeftRef2.current - dragDistance2;
  };

  const handleDragEnd2 = () => {
    document.removeEventListener('mousemove', handleDragMove2);
    document.removeEventListener('mouseup', handleDragEnd2);
  };

  const handleDragStart2 = (e) => {
    dragStartXRef2.current = e.clientX;
    scrollLeftRef2.current = scrollContainerRef2.current.scrollLeft;
    document.addEventListener('mousemove', handleDragMove2);
    document.addEventListener('mouseup', handleDragEnd2);
  };

  useEffect(() => {
    const cleanup = () => {
      document.removeEventListener('mousemove', handleDragMove);
      document.removeEventListener('mouseup', handleDragEnd);
      document.removeEventListener('mousemove', handleDragMove1);
      document.removeEventListener('mouseup', handleDragEnd1);
      document.removeEventListener('mousemove', handleDragMove2);
      document.removeEventListener('mouseup', handleDragEnd2);
    };
    return cleanup;
  });

  return (
    <div className="course-list-container">
      <div className="course-list-heading-container">
        <h2 className="course-list-title">{formatMessage(messages.savedContent)}</h2>
        {/* Filters are hidden for the first container */}
        {/* <div className="course-filter-controls-container">
          <CourseFilterControls {...filterOptions} />
        </div> */}
      </div>
      {hasCourses
        ? (
          <>
            {showFilters && (
              <div id="course-list-active-filters-container">
                <ActiveCourseFilters {...filterOptions} />
              </div>
            )}
            <div
              className="horizontal-scroll-container"
              ref={scrollContainerRef}
              onMouseDown={handleDragStart}
              onMouseUp={handleDragEnd}
              onMouseLeave={handleDragEnd}
              role="scrollbar"
              tabIndex="0"
              aria-controls="scrollContainer1"
              aria-valuenow="0"
            >
              {visibleList.slice(0, 4).map(({ cardId }) => (
                <CourseCard key={cardId} cardId={cardId} showActionButton />
              ))}
              {numPages > 1 && (
              <Pagination
                variant={isCollapsed ? 'reduced' : 'secondary'}
                paginationLabel="Course List"
                className="mx-auto mb-2"
                pageCount={numPages}
                onPageSelect={setPageNumber}
              />
              )}
              {visibleList.length > 4 && (
              <div className="view-all-card">
                <div className="image-wrapper">
                  <img className="saved-image-icon" src={savedImage} alt="" />
                </div>
                <p className="view-all-saved-content-text">{formatMessage(messages.viewSaved)}</p>
                <p className="no-of-saved-content">{formatMessage(messages.noOfItemSaved)}</p>
                <button type="button" onClick="">{formatMessage(messages.viewEverythingSaved)}</button>
              </div>
              )}
            </div>
          </>
        ) : (
          <NoCoursesView />
        )}

      <div className="content-picked-for-you">
        <div className="content-picked-for-you-heading-container">
          <h2 className="course-list-title">{formatMessage(messages.contentForYou)}</h2>
          <div className="course-filter-controls-container">
            <CourseFilterControls {...filterOptions} />
          </div>
        </div>
        <div className="grid-container">
          {visibleList.map(({ cardId }) => (
            <CourseCard key={cardId} cardId={cardId} showActionButton={false} />
          ))}
        </div>
        {numPages > 1 && (
          <Pagination
            variant={isCollapsed ? 'reduced' : 'secondary'}
            paginationLabel="Course List"
            className="mx-auto mb-2"
            pageCount={numPages}
            onPageSelect={setPageNumber}
          />
        )}
        <div className="view-all-button-container">
          <button type="button" className="view-all-button">{formatMessage(messages.viewAll)}</button>
        </div>
      </div>

      <div className="continue-your-journey">
        <h2 className="course-list-title">{formatMessage(messages.continueYourJourney)}</h2>

        <div className="podcast-container">
          <div className="podcast-recommondation-text">
            <p className="based-on-this-text-container">{formatMessage(messages.basedOnPodcast)}</p>
            <img src={arrowImage} alt="Arrow" className="arrow-icon" />
            <p className="we-recommend-these-text-container">{formatMessage(messages.weRecommendThese)}</p>
          </div>

          <div
            className="horizontal-scroll-container"
            ref={scrollContainerRef1}
            onMouseDown={handleDragStart1}
            onMouseUp={handleDragEnd1}
            onMouseLeave={handleDragEnd1}
            role="scrollbar"
            tabIndex="0"
            aria-controls="scrollContainer1"
            aria-valuenow="0"
          >
            {visibleList.slice(0, 4).map(({ cardId }) => (
              <CourseCard key={cardId} cardId={cardId} showActionButton={false} />
            ))}

            {visibleList.length > 4 && (
              <div className="view-all-card">
                <div className="image-wrapper">
                  <img className="saved-image-icon" src={savedImage} alt="" />
                </div>
                <p className="explore-more-text">{formatMessage(messages.exploreMore)}</p>
                <p className="we-are-suggesting-content-text">{formatMessage(messages.exploreCardLine1)}<br />{formatMessage(messages.exploreCardLine2)}<br />{formatMessage(messages.exploreCardLine3)}</p>
                <button type="button" onClick="">{formatMessage(messages.viewMore)}</button>
              </div>
            )}
          </div>
        </div>

        <div className="article-container">
          <div className="article-recommondation-text">
            <p className="based-on-this-text-container">{formatMessage(messages.basedOnArticle)}</p>
            <img src={arrowImage} alt="Arrow" className="arrow-icon" />
            <p className="we-recommend-these-text-container">{formatMessage(messages.weRecommendThese)}</p>
          </div>

          <div
            className="horizontal-scroll-container"
            ref={scrollContainerRef2}
            onMouseDown={handleDragStart2}
            onMouseUp={handleDragEnd2}
            onMouseLeave={handleDragEnd2}
            role="scrollbar"
            tabIndex="0"
            aria-controls="scrollContainer1"
            aria-valuenow="0"
          >
            {visibleList.slice(0, 4).map(({ cardId }) => (
              <CourseCard key={cardId} cardId={cardId} showActionButton={false} />
            ))}

            {visibleList.length > 4 && (
              <div className="view-all-card">
                <div className="image-wrapper">
                  <img className="saved-image-icon" src={savedImage} alt="" />
                </div>
                <p className="explore-more-text">{formatMessage(messages.exploreMore)}</p>
                <p className="we-are-suggesting-content-text">{formatMessage(messages.exploreCardLine1)}<br />{formatMessage(messages.exploreCardLine2)}<br />{formatMessage(messages.exploreCardLine3)}</p>
                <button type="button" onClick="">{formatMessage(messages.viewMore)}</button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

CourseList.propTypes = {};

export default CourseList;
