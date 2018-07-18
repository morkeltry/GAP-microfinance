BEGIN;
  DROP TABLE IF EXISTS borrowers, lenders, offered, accepted, histories
  CASCADE;

CREATE TABLE borrowers
(
  eth_address VARCHAR(42) PRIMARY KEY NOT NULL,
  phone_number VARCHAR(20) NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE UNIQUE INDEX borrower_uniq_idx ON borrowers (eth_address);

CREATE TABLE lenders
(
  eth_address VARCHAR(150) PRIMARY KEY NOT NULL,
  name VARCHAR(60) NOT NULL,
  capital INTEGER,
  min_amount INTEGER,
  max_amount INTEGER,
  min_duration SMALLINT,
  max_duration SMALLINT,
  preferred_amount INTEGER,
  preferred_duration SMALLINT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE UNIQUE INDEX lender_uniq_idx ON lenders (eth_address);

CREATE TABLE offered
(
  id SMALLSERIAL PRIMARY KEY NOT NULL,
  start_day TIMESTAMPTZ NOT NULL DEFAULT now(),
  end_day TIMESTAMPTZ NOT NULL DEFAULT now(),
  repayment_schedule VARCHAR(1000) NOT NULL,
  lender_name VARCHAR(60) NOT NULL,
  lender_eth_address VARCHAR(42) NOT NULL,
  borrower_eth_address VARCHAR(42) NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE accepted
(
  id SMALLSERIAL PRIMARY KEY NOT NULL,
  fully_paid BOOLEAN,
  start_day TIMESTAMPTZ NOT NULL DEFAULT now(),
  end_day TIMESTAMPTZ NOT NULL DEFAULT now(),
  repayment_schedule VARCHAR(1000),
  lender_name VARCHAR(60) NOT NULL,
  lender_eth_address VARCHAR(42) NOT NULL,
  borrower_eth_address VARCHAR(42) NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE histories
(
  id SMALLSERIAL PRIMARY KEY NOT NULL,
  borrower_eth_address VARCHAR(42) NOT NULL,
  lender_eth_address VARCHAR(42) NOT NULL,
  start_day TIMESTAMPTZ NOT NULL DEFAULT now(),
  end_day TIMESTAMPTZ NOT NULL DEFAULT now(),
  early_repayment_days VARCHAR(60) NOT NULL,
  last_sync_time TIMESTAMPTZ NOT NULL DEFAULT now(),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

COMMIT;
