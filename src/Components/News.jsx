import React, { useEffect } from 'react'
import Weather from './Weather'
import Calender from './Calendar'
import './News.css' 
import useImg from '../assets/images/user.jpg'
import noImg from '../assets/images/no-img.png'
import tech from '../assets/images/tech.jpg'
import science from '../assets/images/science.jpg'
import world from '../assets/images/world.jpg'
import nation from '../assets/images/nation.jpg'
import health from '../assets/images/health.jpg'
import entertainment from '../assets/images/entertainment.jpg'
import sports from '../assets/images/sports.jpg'
import axios from 'axios'
import { useState } from 'react'
import NewsModal from './NewsModal'
import Bookmarks from './Bookmarks'
import BlogsModal from './BlogsModal'
// import blogImg1 from '../assets/images/blog1.jpg'
// import blogImg2 from '../assets/images/blog2.jpg'
// import blogImg3 from '../assets/images/blog3.jpg'
// import blogImg4 from '../assets/images/blog4.jpg'




const categories = ['general', 'world', 'business', 'technology', 'entertainment', 'sports', 'science', 'health', 'nation'];


const News = ({onShowBlogs , blogs, onEditBlog , onDeleteBlog}) => {



  const staticNews = [
  {
    title: "Tech Titans Unveil AI Breakthroughs at Global Summit 2025",
    image: tech,
    description: "Major players in the tech industry showcased game-changing AI innovations.",
    content: "From autonomous cities to ethical AI governance, the summit revealed what the future holds.",
    publishedAt: "2025-07-17T10:00:00Z",
    source: { name: "Tech Daily" },
    url: "#",
  },
  {
    title: "New Scientific Discovery May Revolutionize Clean Energy",
    image: science,
    description: "Scientists discover a sustainable way to generate electricity from air moisture.",
    content: "This breakthrough is expected to power remote regions with zero carbon emissions.",
    publishedAt: "2025-07-16T15:30:00Z",
    source: { name: "Science World" },
    url: "#",
  },
  {
    title: "World Unites for Peace as Nations Sign Historic Pact",
    image: world,
    description: "Leaders from over 80 countries gathered to sign the Global Peace Accord.",
    content: "The agreement includes steps for disarmament, education reform, and cooperation.",
    publishedAt: "2025-07-15T12:00:00Z",
    source: { name: "Global Times" },
    url: "#",
  },
  {
    title: "India Launches 'Digital Nation' Program to Empower Villages",
    image: nation,
    description: "Digital infrastructure will reach 1 lakh villages by 2026.",
    content: "Internet access, online education, and telemedicine will uplift rural life.",
    publishedAt: "2025-07-14T09:45:00Z",
    source: { name: "Bharat News" },
    url: "#",
  },
  {
    title: "2025 Health Trends: Preventive Care and Longevity Take Center Stage",
    image: health,
    description: "Personalized wellness and AI diagnosis are revolutionizing health.",
    content: "Doctors are focusing more on lifestyle interventions than prescriptions.",
    publishedAt: "2025-07-13T18:20:00Z",
    source: { name: "HealthLine India" },
    url: "#",
  },
  {
    title: "Entertainment World Stunned as Indie Film Wins Global Awards",
    image: entertainment,
    description: "'Quiet Horizon' bags Best Picture at the World Film Fest.",
    content: "The film's storytelling and direction were praised by critics worldwide.",
    publishedAt: "2025-07-12T21:00:00Z",
    source: { name: "Film Spot" },
    url: "#",
  },
  {
    title: "Record-Breaking Victory: Underdog Team Triumphs in World Cup Final",
    image: sports,
    description: "In a shocking finale, the least expected team lifts the cup.",
    content: "The final match had 3 penalty saves and a 90+3' winner.",
    publishedAt: "2025-07-11T20:00:00Z",
    source: { name: "Sports Nation" },
    url: "#",
  },
];




  const [headline, setHeadline] = useState(null);
  const [news, setNews] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('general');

  const [searchInput, setSearchInput] = useState('');
  const [searchQuery, setSearchQuery] = useState('');


  const [showModal, setShowModal] = useState(false);
  const [selectedArticle, setSelectedArticle] = useState(null);

  const [bookmarks, setBookmarks] = useState([]);
  const [showBookmarksModal, setShowBookmarksModal] = useState(false);

  const [selectedPost, setSelectedPost] = useState(null)
  const [showBlogModal, setShowBlogModal] = useState(false)

  useEffect(() => {
  const fetchNews = async () => {
    let url = `https://gnews.io/api/v4/top-headlines?category=${selectedCategory}&lang=en&apikey=76321d137556ebaf05d01954f5120756`;

    if (searchQuery) {
      url = `https://gnews.io/api/v4/search?q=${searchQuery}&apikey=76321d137556ebaf05d01954f5120756`;
    }

    try {
      const response = await axios.get(url);
      const fetchedNews = response.data.articles;

      fetchedNews.forEach((article) => {
        if (!article.image) {
          article.image = noImg;
        }
      });

      setHeadline(fetchedNews[0]);
      setNews(fetchedNews.slice(1, 7));
      

      const savedBookmarks = JSON.parse(localStorage.getItem('bookmarks')) || [];
      setBookmarks(savedBookmarks);




    } catch (error) {
      if (error.response && error.response.status === 403) {
        // Use static fallback news
        setHeadline(staticNews[0]);
        setNews(staticNews.slice(1, 7));

         const savedBookmarks = JSON.parse(localStorage.getItem('bookmarks')) || [];
      setBookmarks(savedBookmarks);

      } else {
        console.error("Error fetching news:", error);
      }
    }
  };

  fetchNews();
}, [selectedCategory, searchQuery]);

  const handleCategoryClick = (e, category) => {
    e.preventDefault();
    setSelectedCategory(category);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    setSearchQuery(searchInput);
    setSearchInput('');
  };

  const handleArticleClick = (article) => {
    setSelectedArticle(article);
    setShowModal(true);

  };

  const handleBookmarkClick = (article) => {
    setBookmarks((prevBookmarks) => {

      const updatedBookmarks = prevBookmarks.find((bookmark) => bookmark.title === article.title) ?
        prevBookmarks.filter((bookmark) => bookmark.title !== article.title) : [...prevBookmarks, article];
        localStorage.setItem('bookmarks', JSON.stringify(updatedBookmarks));

      return updatedBookmarks;
    });
  };

  const handleBlogClick = (blog) => {
    setSelectedPost(blog)
    setShowBlogModal(true)

  }

  const closeBlogModal =()=> {
    setShowBlogModal(false)
    setSelectedPost(null)
  }

  return (
    <div className='news'>
      <header className="news-header">
        <h1 className="logo">Budge Budge News</h1>
        <div className="search-bar">
          <form onSubmit={handleSearch}>
            <input type="text" placeholder='Search News...' value={searchInput} onChange={(e) => setSearchInput(e.target.value)} />
            <button type='submit'><i className="fa-solid fa-magnifying-glass"></i></button>
          </form>
        </div>
      </header>
      <div className="news-content">
        <div className="navbar">
          <div className="user" onClick={onShowBlogs}>
            <img src={useImg} alt='User Image' />
            <p>User</p>
          </div>
          <nav className="categories">
            <h1 className="nav-heading">Categories</h1>
            <div className="nav-links">
              {categories.map((category) => (
                <a
                  href="#"
                  className={`nav-link ${selectedCategory === category ? 'active' : ''}`}
                  onClick={(e) => handleCategoryClick(e, category)}
                  key={category}
                >
                  {category.charAt(0).toUpperCase() + category.slice(1)}
                </a>
              ))}       

            <a href="#" className="nav-link" onClick={() => setShowBookmarksModal(true)}>Bookmarks <i className="fa-solid fa-bookmark"></i></a>
             </div>
          </nav>
        </div>
        <div className="news-section">
          {headline && <div className="headline" onClick={() => handleArticleClick(headline)}>
            <img src={headline.image || noImg} alt={headline?.title} />
            <h2 className="headline-title">{headline?.title}
              <i className={` fa-bookmark bookmark ${bookmarks.some((bookmark) => bookmark.title === headline.title) ? 'fa-solid' : 'fa-regular'}`} onClick={(e) => {
                e.stopPropagation();
                handleBookmarkClick(headline);
              }}></i>
            </h2>
          </div>}
          
          <div className="news-grid">
            {news.map((article, index)=> (
              <div key={index} className="news-grid-item" onClick={() => handleArticleClick(article)}>
              <img src={article.image || noImg} alt={article.title} />
              <h3>{article.title} <i className={`fa-bookmark bookmark ${bookmarks.some((bookmark) => bookmark.title === article.title) ? 'fa-solid' : 'fa-regular'}`} onClick={(e) => {
                e.stopPropagation();
                handleBookmarkClick(article);
              }}></i></h3>
            </div>

            ))}
          </div>
        </div>
        <NewsModal show={showModal} article={selectedArticle} onClose={() => setShowModal(false)} />
        <Bookmarks  show={showBookmarksModal} bookmarks={bookmarks} onClose={() => setShowBookmarksModal(false)} onSelectArticle={handleArticleClick} onDeleteBookmark={handleBookmarkClick} />
        <div className="my-blogs">
          <h1 className="my-blogs-heading">My Blogs</h1>
          <div className="blog-posts">
            {blogs.map((blog, index)=> (<div key={index} className='blog-post' onClick={()=>handleBlogClick(blog)}>
              <img src={blog.image || noImg} alt={blog.title} />
              <h3>{blog.title}</h3>
              {/* <p>{blog.content}</p> */}
              <div className="post-buttons">
                <button className="edit-post" onClick={()=> onEditBlog(blog)}>
                  <i className="bx bxs-edit"></i>
                </button>
                <button className="delete-post" onClick={(e) => {
    e.stopPropagation(); // prevent opening modal
    onDeleteBlog(blog);
  }}>
                  <i className="bx bxs-x-circle"></i>
                </button>
              </div>
            </div>))}
            
          </div>
          {selectedPost && showBlogModal && (<BlogsModal show={showBlogModal} blog={selectedPost} onClose={closeBlogModal}/>)}

          
        </div>
        <div className="weather-calender">
        <Weather />
        <Calender /> 
        </div>       
      </div>
      <footer className="news-footer">
        <p><span>News App</span></p>
        <p>© 2023 Budge Budge News. All rights reserved.</p>

      </footer>
    </div>
  )
}

export default News
