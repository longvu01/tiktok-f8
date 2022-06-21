import { faCircleXmark, faSpinner } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import HeadlessTippy from '@tippyjs/react/headless';
import classNames from 'classnames/bind';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import 'tippy.js/dist/tippy.css';
import AccountItem from '~/components/AccountItem';
import { SearchIcon } from '~/components/Icons';
import { Wrapper as PopperWrapper } from '~/components/Popper';
import { useDebounce } from '~/hooks';
import * as searchServices from '~/services/searchService';
import styles from './Search.module.scss';

const cx = classNames.bind(styles);

function Search() {
  const [searchValue, setSearchValue] = useState('');
  const [searchResult, setSearchResult] = useState([]);
  const [showResult, setShowResult] = useState(false);
  const [loading, setLoading] = useState(false);

  const debouncedValue = useDebounce(searchValue, 500);

  const InputRef = useRef();

  useEffect(() => {
    if (debouncedValue === '') {
      setSearchResult([]);
      return;
    }

    const fetchApi = async () => {
      setLoading(true);

      const result = await searchServices.search(debouncedValue);
      setSearchResult(result);

      setLoading(false);
    };

    fetchApi();
  }, [debouncedValue]);

  // Handlers
  const handleChangeValue = (e) => {
    let searchValue = e.target.value;

    // if (searchValue === '') setSearchResult([]);

    if (!searchValue.startsWith(' ')) setSearchValue(searchValue);
  };

  const handleClearInput = () => {
    setSearchValue('');
    setSearchResult([]);
    InputRef.current.focus();
  };

  const handleHideResult = useCallback(() => setShowResult(false), []);

  const handleSubmit = () => {
    console.log('submit');
  };

  const searchResultElement = useMemo(
    () =>
      searchResult.map((result) => (
        <AccountItem key={result.id} data={result} onClick={handleHideResult} />
      )),
    [searchResult, handleHideResult],
  );

  return (
    // Using a wrapper <div> tag around the reference element solves this by creating a new parentNode context.
    <div>
      <HeadlessTippy
        interactive
        visible={showResult && searchResult.length > 0}
        render={(attrs) => (
          <div className={cx('search-result')} tabIndex="-1" {...attrs}>
            <PopperWrapper>
              <h4 className={cx('search-title')}>Accounts</h4>
              {searchResultElement}
            </PopperWrapper>
          </div>
        )}
        onClickOutside={handleHideResult}
      >
        <div className={cx('search')}>
          <input
            ref={InputRef}
            placeholder="Search accounts and videos"
            spellCheck={false}
            value={searchValue}
            onChange={handleChangeValue}
            onFocus={() => setShowResult(true)}
          />
          {!!searchValue && !loading && (
            <button className={cx('clear')} onClick={handleClearInput}>
              <FontAwesomeIcon icon={faCircleXmark} />
            </button>
          )}
          {loading && (
            <FontAwesomeIcon className={cx('loading')} icon={faSpinner} />
          )}

          <button
            className={cx('search-btn')}
            onClick={handleSubmit}
            // Prevent focus within
            onMouseDown={(e) => e.preventDefault()}
          >
            <SearchIcon />
          </button>
        </div>
      </HeadlessTippy>
    </div>
  );
}

export default Search;
