import { useLayoutEffect, useRef, useState } from 'react';
import { useIsFetching } from '@tanstack/react-query';
import { Routes, Route, useLocation } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Preloader from './components/Preloader';
import { ReadyContext } from './context/ready';
import { usePage } from './lib/api/queries';
import { usePageMeta } from './hooks/usePageMeta';
import { PAGE, type PageCode } from './lib/api/pages';
import Home from './pages/Home';
import Story from './pages/Story';
import Products from './pages/Products';
import Food from './pages/Food';
import News from './pages/News';
import NewsDetail from './pages/NewsDetail';
import Distribution from './pages/Distribution';

// Don't let the browser restore the old scroll position on reload — we always
// start at the top (behind the loading screen).
if (typeof window !== 'undefined' && 'scrollRestoration' in window.history) {
    window.history.scrollRestoration = 'manual';
}

// First page view shows the full logo motion; later navigations are quicker.
const FIRST_LOAD_MS = 3000;
const ROUTE_CHANGE_MS = 1000;

// Route → CMS page code, so the loader can wait for that page's data.
const PATH_TO_PAGE: Record<string, PageCode> = {
    '/': PAGE.HOME,
    '/story': PAGE.ABOUT_US,
    '/products': PAGE.PRODUCT,
    '/food': PAGE.FOOD,
    '/news': PAGE.NEWS,
    '/distribution': PAGE.DISTRIBUTION,
};

export default function App() {
    const location = useLocation();
    const [ready, setReady] = useState(false);
    // True until the very first load finishes; route changes use the shorter time.
    const isFirstLoad = useRef(true);

    // Fetch this route's page content; the loader hides only once it has settled.
    const knownPage = location.pathname in PATH_TO_PAGE;
    const pageCode = PATH_TO_PAGE[location.pathname] ?? PAGE.HOME;
    const pageQuery = usePage(pageCode);

    // SEO: drive <title> + OG/Twitter from the page's CMS meta — but only for the
    // known top-level pages. Dynamic routes (e.g. /news/:slug) set their own meta.
    usePageMeta(knownPage ? pageQuery.data?.data : undefined);

    // Wait for the page content AND every other query the route fired
    // (products, brands, timeline, news, settings…) to finish before hiding.
    const fetching = useIsFetching();
    const dataReady = pageQuery.isFetched && fetching === 0;

    // On first load AND every route change: jump to the top and re-arm the
    // loading screen (Preloader remounts via its `key`, content gates on `ready`).
    useLayoutEffect(() => {
        window.scrollTo(0, 0);
        setReady(false);
    }, [location.pathname]);

    const handleDone = () => {
        setReady(true);
        isFirstLoad.current = false;
    };

    return (
        <ReadyContext.Provider value={ready}>
            <Preloader
                key={location.pathname}
                minVisibleMs={isFirstLoad.current ? FIRST_LOAD_MS : ROUTE_CHANGE_MS}
                dataReady={dataReady}
                onDone={handleDone}
            />
            <div className="relative min-h-screen font-sans">
                <Header />
                <Routes location={location}>
                    <Route path="/" element={<Home />} />
                    <Route path="/story" element={<Story />} />
                    <Route path="/products" element={<Products />} />
                    <Route path="/food" element={<Food />} />
                    <Route path="/news" element={<News />} />
                    <Route path="/news/:slug" element={<NewsDetail />} />
                    <Route path="/distribution" element={<Distribution />} />
                </Routes>
                <Footer />
            </div>
        </ReadyContext.Provider>
    );
}
