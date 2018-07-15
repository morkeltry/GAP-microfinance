BEGIN;
  DROP TABLE IF EXISTS borrowers, lenders, offered, accepted, histories
  CASCADE;

CREATE TABLE borrowers
(
  eth_address VARCHAR(150) PRIMARY KEY NOT NULL,
  phone_number VARCHAR(60) NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE UNIQUE INDEX address_uniq_idx ON borrowers (eth_address);

CREATE TABLE lenders
(
  eth_address VARCHAR(150) PRIMARY KEY NOT NULL,
  first_name VARCHAR(60) NOT NULL,
  capital INTEGER,
  min_amount INTEGER,
  max_amount INTEGER,
  minduration INTEGER,
  maxDuration INTEGER,
  preferredAmount INTEGER,
  preferredDuration INTEGER,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE UNIQUE INDEX address_uniq_idx ON lenders (eth_address);

CREATE TABLE offered
(
  id BIGSERIAL PRIMARY KEY NOT NULL,
  start_day TIMESTAMPTZ NOT NULL DEFAULT now(),
  end_day TIMESTAMPTZ NOT NULL DEFAULT now(),
  repayment_schedule VARCHAR(150) NOT NULL,
  lender_name VARCHAR(60) NOT NULL,
  lender_eth_address VARCHAR(150) NOT NULL,
  borrower_eth_address VARCHAR(150) NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE accepted
(
  id BIGSERIAL PRIMARY KEY NOT NULL,
  fully_paid BOOLEAN,
  start_day TIMESTAMPTZ NOT NULL DEFAULT now(),
  end_day TIMESTAMPTZ NOT NULL DEFAULT now(),
  repayment_schedule VARCHAR(150),
  lender_name VARCHAR(60) NOT NULL,
  lender_eth_address VARCHAR(60) NOT NULL,
  borrower_eth_address VARCHAR(60) NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE histories
(
  id BIGSERIAL PRIMARY KEY NOT NULL,
  borrower_eth_address VARCHAR(150) PRIMARY KEY NOT NULL,
  lender_eth_address VARCHAR(150) PRIMARY KEY NOT NULL,
  start_day TIMESTAMPTZ NOT NULL DEFAULT now(),
  end_day TIMESTAMPTZ NOT NULL DEFAULT now(),
  early_repayment_days VARCHAR(60) NOT NULL,
  last_sync_address VARCHAR(60) NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

COMMIT;