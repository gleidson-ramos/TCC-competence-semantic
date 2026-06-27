# venv\Scripts\activate
import os
#OPENAI_API_KEY = os.getenv("OPENAI_API_KEY", "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")

OPENAI_API_KEY = os.getenv("OPENAI_API_KEY", "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")

#DB_CONN_RAW = "postgresql://gleidson:123456@localhost:5433/npai"
#DB_CONN_VECTOR = "postgresql+psycopg://gleidson:123456@localhost:5433/npai"

DB_CONN_RAW = "postgresql://postgres:123456@localhost:5433/iapos"
DB_CONN_VECTOR = "postgresql+psycopg://postgres:123456@localhost:5433/iapos"