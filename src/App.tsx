import { Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import Story from './pages/Story';
import Products from './pages/Products';
import Food from './pages/Food';
import News from './pages/News';
import Distribution from './pages/Distribution';

export default function App() {
    return (
        <div className="relative min-h-screen font-sans">
            <Header />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/story" element={<Story />} />
                <Route path="/products" element={<Products />} />
                <Route path="/food" element={<Food />} />
                <Route path="/news" element={<News />} />
                <Route path="/distribution" element={<Distribution />} />
            </Routes>
            <Footer />
        </div>
    );
}
