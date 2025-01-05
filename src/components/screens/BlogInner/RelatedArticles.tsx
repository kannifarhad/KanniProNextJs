import { Article } from "@/types/api";
import React from "react";
import { StyledRelatedArticles } from "./styled";
import Link from "next/link";

const RelatedArticles: React.FC<{ articles: Article["relatedarticles"] }> = ({
  articles,
}) => {
  return (
    <StyledRelatedArticles>
      <h2>Related Articles</h2>
      <div className="relatedArticlesCont grid gap-2 2xl:grid-cols-3 xl:grid-cols-2 md:grid-cols-1 grid-cols-1">
        {articles.map((article) => (
          <Link
            href={`/blog/${article.slug}`}
            target="_blank"
            key={article.slug}
            className="relatedArticle"
          >
            <span className="title">{article.title}</span>
            <span className="description">{article.description}</span>
          </Link>
        ))}
      </div>
    </StyledRelatedArticles>
  );
};

export default RelatedArticles;
