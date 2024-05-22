--
-- PostgreSQL database dump
--

-- Dumped from database version 14.5
-- Dumped by pg_dump version 14.5

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: uuid-ossp; Type: EXTENSION; Schema: -; Owner: -
--

CREATE EXTENSION IF NOT EXISTS "uuid-ossp" WITH SCHEMA public;


--
-- Name: EXTENSION "uuid-ossp"; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION "uuid-ossp" IS 'generate universally unique identifiers (UUIDs)';


--
-- Name: project_type_enum; Type: TYPE; Schema: public; Owner: sakana-san-db
--

CREATE TYPE public.project_type_enum AS ENUM (
    'TATTOO',
    'FLASH',
    'PRINT',
    'OTHER'
);


ALTER TYPE public.project_type_enum OWNER TO "sakana-san-db";

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: address; Type: TABLE; Schema: public; Owner: sakana-san-db
--

CREATE TABLE public.address (
    id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    "createdAt" timestamp without time zone DEFAULT now() NOT NULL,
    "updatedAt" timestamp without time zone DEFAULT now() NOT NULL,
    street character varying DEFAULT ''::character varying NOT NULL,
    city character varying DEFAULT ''::character varying NOT NULL,
    "zipCode" character varying DEFAULT ''::character varying NOT NULL,
    country character varying DEFAULT ''::character varying NOT NULL
);


ALTER TABLE public.address OWNER TO "sakana-san-db";

--
-- Name: media; Type: TABLE; Schema: public; Owner: sakana-san-db
--

CREATE TABLE public.media (
    id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    "createdAt" timestamp without time zone DEFAULT now() NOT NULL,
    "updatedAt" timestamp without time zone DEFAULT now() NOT NULL,
    url character varying NOT NULL,
    "localPath" character varying DEFAULT ''::character varying NOT NULL,
    filename character varying DEFAULT ''::character varying NOT NULL,
    type character varying NOT NULL,
    size integer NOT NULL,
    "projectId" uuid,
    "healedsId" uuid
);


ALTER TABLE public.media OWNER TO "sakana-san-db";

--
-- Name: migrations; Type: TABLE; Schema: public; Owner: sakana-san-db
--

CREATE TABLE public.migrations (
    id integer NOT NULL,
    "timestamp" bigint NOT NULL,
    name character varying NOT NULL
);


ALTER TABLE public.migrations OWNER TO "sakana-san-db";

--
-- Name: migrations_id_seq; Type: SEQUENCE; Schema: public; Owner: sakana-san-db
--

CREATE SEQUENCE public.migrations_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.migrations_id_seq OWNER TO "sakana-san-db";

--
-- Name: migrations_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: sakana-san-db
--

ALTER SEQUENCE public.migrations_id_seq OWNED BY public.migrations.id;


--
-- Name: place; Type: TABLE; Schema: public; Owner: sakana-san-db
--

CREATE TABLE public.place (
    id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    "createdAt" timestamp without time zone DEFAULT now() NOT NULL,
    "updatedAt" timestamp without time zone DEFAULT now() NOT NULL,
    name character varying DEFAULT ''::character varying NOT NULL,
    "addressId" uuid
);


ALTER TABLE public.place OWNER TO "sakana-san-db";

--
-- Name: project; Type: TABLE; Schema: public; Owner: sakana-san-db
--

CREATE TABLE public.project (
    id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    "createdAt" timestamp without time zone DEFAULT now() NOT NULL,
    "updatedAt" timestamp without time zone DEFAULT now() NOT NULL,
    type public.project_type_enum DEFAULT 'TATTOO'::public.project_type_enum NOT NULL,
    date timestamp without time zone DEFAULT '2024-05-16 09:45:25.84'::timestamp without time zone NOT NULL,
    "isVisible" boolean DEFAULT true NOT NULL,
    "isFavorite" boolean DEFAULT true NOT NULL,
    title character varying,
    description character varying,
    "coverImageId" character varying,
    "coverHealedId" character varying,
    "placeId" uuid
);


ALTER TABLE public.project OWNER TO "sakana-san-db";

--
-- Name: session; Type: TABLE; Schema: public; Owner: sakana-san-db
--

CREATE TABLE public.session (
    id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    "createdAt" timestamp without time zone DEFAULT now() NOT NULL,
    "updatedAt" timestamp without time zone DEFAULT now() NOT NULL,
    name character varying,
    "startDate" timestamp without time zone DEFAULT '2024-05-16 09:45:25.84'::timestamp without time zone NOT NULL,
    "endDate" timestamp without time zone,
    "isVisible" boolean DEFAULT true NOT NULL,
    "isArchived" boolean DEFAULT false NOT NULL,
    "placeId" uuid
);


ALTER TABLE public.session OWNER TO "sakana-san-db";

--
-- Name: user; Type: TABLE; Schema: public; Owner: sakana-san-db
--

CREATE TABLE public."user" (
    id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    "createdAt" timestamp without time zone DEFAULT now() NOT NULL,
    "updatedAt" timestamp without time zone DEFAULT now() NOT NULL,
    username character varying NOT NULL,
    paragraph1 character varying,
    paragraph2 character varying,
    password character varying NOT NULL,
    email character varying,
    phone character varying,
    instagram character varying,
    facebook character varying,
    "placeId" uuid
);


ALTER TABLE public."user" OWNER TO "sakana-san-db";

--
-- Name: migrations id; Type: DEFAULT; Schema: public; Owner: sakana-san-db
--

ALTER TABLE ONLY public.migrations ALTER COLUMN id SET DEFAULT nextval('public.migrations_id_seq'::regclass);


--
-- Data for Name: address; Type: TABLE DATA; Schema: public; Owner: sakana-san-db
--

COPY public.address (id, "createdAt", "updatedAt", street, city, "zipCode", country) FROM stdin;
4bba3678-1ada-4238-9b0d-66b64094b26f	2024-05-05 14:20:37.191402	2024-05-05 14:20:37.191402	16 Rue des Lilas	Yzeure	03400	France
916aeb63-8ed7-4081-b3a8-9166dadb39fc	2024-05-05 14:22:20.051272	2024-05-05 14:22:20.051272	16 Avenue Richard Wagner	Creutzwald	57150	France
\.


--
-- Data for Name: media; Type: TABLE DATA; Schema: public; Owner: sakana-san-db
--

COPY public.media (id, "createdAt", "updatedAt", url, "localPath", filename, type, size, "projectId", "healedsId") FROM stdin;
def3b26c-6d3f-4951-a822-3846a5ee1dc2	2024-05-16 09:55:03.436311	2024-05-16 09:55:04.620105	http://localhost:8000/files/9120954a-ce20-452d-90c8-487b9f2991e0.webp	./public/files/9120954a-ce20-452d-90c8-487b9f2991e0.webp	Capture dâeÌcran 2024-05-16 aÌ 10.48.30.png	FILE	1460918	9d46dcab-2bcb-4473-b111-9f938991632c	\N
\.


--
-- Data for Name: migrations; Type: TABLE DATA; Schema: public; Owner: sakana-san-db
--

COPY public.migrations (id, "timestamp", name) FROM stdin;
1	1715852723956	Migrations1715852723956
\.


--
-- Data for Name: place; Type: TABLE DATA; Schema: public; Owner: sakana-san-db
--

COPY public.place (id, "createdAt", "updatedAt", name, "addressId") FROM stdin;
94471083-929b-40e5-832d-a52c36eb09f8	2024-05-05 14:20:37.302799	2024-05-05 14:20:37.302799	Action	4bba3678-1ada-4238-9b0d-66b64094b26f
8eb64450-35e4-49b3-803e-86eca49abc13	2024-05-05 14:22:20.110057	2024-05-05 14:22:20.110057	coucou	916aeb63-8ed7-4081-b3a8-9166dadb39fc
\.


--
-- Data for Name: project; Type: TABLE DATA; Schema: public; Owner: sakana-san-db
--

COPY public.project (id, "createdAt", "updatedAt", type, date, "isVisible", "isFavorite", title, description, "coverImageId", "coverHealedId", "placeId") FROM stdin;
9d46dcab-2bcb-4473-b111-9f938991632c	2024-05-16 09:05:39.347447	2024-05-16 09:55:04.620105	TATTOO	2024-05-16 11:04:06.186	t	t	qSFD	SDFCSDF	def3b26c-6d3f-4951-a822-3846a5ee1dc2	\N	94471083-929b-40e5-832d-a52c36eb09f8
\.


--
-- Data for Name: session; Type: TABLE DATA; Schema: public; Owner: sakana-san-db
--

COPY public.session (id, "createdAt", "updatedAt", name, "startDate", "endDate", "isVisible", "isArchived", "placeId") FROM stdin;
27220230-7a23-49ca-a00c-80f18dd0519a	2024-05-05 14:30:20.593891	2024-05-05 14:30:30.041936	Test Event	2024-05-03 00:00:00	\N	t	t	8eb64450-35e4-49b3-803e-86eca49abc13
cf4ec12a-2087-471a-a629-6263d7147502	2024-05-05 14:30:45.121112	2024-05-05 14:30:50.011936	Action	2024-05-05 00:00:00	\N	t	t	8eb64450-35e4-49b3-803e-86eca49abc13
20c59f9c-2183-4497-b4ef-2a5d11f41cab	2024-05-05 14:31:29.753615	2024-05-05 14:31:30.016926	sdfsf	2024-05-05 00:00:00	\N	t	t	8eb64450-35e4-49b3-803e-86eca49abc13
f7b17260-8657-46d5-8ec9-76f7258ea3ed	2024-05-05 14:37:38.442376	2024-05-05 14:37:40.014119	soul	2024-05-05 00:00:00	\N	t	t	8eb64450-35e4-49b3-803e-86eca49abc13
0671e8e2-844e-48e0-8b61-2e5671116363	2024-05-05 14:39:14.415016	2024-05-05 14:39:20.008683	soul	2024-05-05 00:00:00	\N	t	t	8eb64450-35e4-49b3-803e-86eca49abc13
5f950ab1-08cf-4cee-baae-2934b7680c70	2024-05-05 14:38:01.250205	2024-05-05 14:40:30.019259	Noe	2024-05-06 00:00:00	\N	t	t	8eb64450-35e4-49b3-803e-86eca49abc13
373793ac-0090-4cc9-8542-c96765d68d81	2024-05-05 14:40:32.285488	2024-05-05 14:40:40.010264	sdfsdf	2024-05-05 00:00:00	\N	t	t	8eb64450-35e4-49b3-803e-86eca49abc13
3c0ddbfb-ee4f-4a6f-8a4e-67c510cc8c42	2024-05-05 14:40:56.633288	2024-05-05 14:40:56.633288	qsdsqdf	2024-05-05 00:00:00	\N	t	f	8eb64450-35e4-49b3-803e-86eca49abc13
2721aa84-e19b-4505-9b2d-0acaca4eb908	2024-05-05 14:41:35.525205	2024-05-05 14:41:35.525205	qwfdsdf	2024-05-03 00:00:00	2024-05-05 00:00:00	t	f	8eb64450-35e4-49b3-803e-86eca49abc13
7c2c4d9b-c2b1-46d1-8769-52c33c534831	2024-05-05 14:55:32.004903	2024-05-05 14:55:50.023229	dfscwd	2024-05-02 00:00:00	2024-05-04 00:00:00	t	t	94471083-929b-40e5-832d-a52c36eb09f8
94b0ce06-92b6-4be8-b76c-809f586efe65	2024-05-05 14:56:07.67681	2024-05-05 14:56:07.67681	wdfwf	2024-05-10 00:00:00	\N	t	f	8eb64450-35e4-49b3-803e-86eca49abc13
c789eb9a-a7aa-45d5-8927-2924f9aac08c	2024-05-05 17:49:21.56935	2024-05-05 17:49:50.984668	dsfxbdf	2024-05-05 00:00:00	2024-05-09 00:00:00	t	f	8eb64450-35e4-49b3-803e-86eca49abc13
791a2392-c555-46ce-a2cc-7ac7625ef87c	2024-05-05 18:06:45.34521	2024-05-05 18:06:50.024325	wxc	2024-05-04 00:00:00	2024-05-04 00:00:00	t	t	8eb64450-35e4-49b3-803e-86eca49abc13
d4296b83-f0aa-46f6-99c6-3dfbe93e6d6d	2024-05-05 18:07:08.414494	2024-05-05 18:07:10.00958	SUêr 	2024-05-01 00:00:00	2024-05-03 00:00:00	t	t	94471083-929b-40e5-832d-a52c36eb09f8
73f6dad2-1744-48c0-8b0a-9533a498e602	2024-05-05 18:07:28.5797	2024-05-05 18:07:28.5797	xdvdfx	2024-05-03 00:00:00	2024-05-05 00:00:00	t	f	94471083-929b-40e5-832d-a52c36eb09f8
d62ae144-c275-48ad-8b31-d058f80db83b	2024-05-05 18:07:44.085725	2024-05-05 18:07:44.085725	GRand	2024-05-03 00:00:00	2024-05-05 00:00:00	t	f	94471083-929b-40e5-832d-a52c36eb09f8
42357f8d-5749-468f-9d9f-7012ff57a196	2024-05-05 18:08:15.675169	2024-05-05 18:08:15.675169	Super test	2024-05-06 00:00:00	\N	t	f	8eb64450-35e4-49b3-803e-86eca49abc13
\.


--
-- Data for Name: user; Type: TABLE DATA; Schema: public; Owner: sakana-san-db
--

COPY public."user" (id, "createdAt", "updatedAt", username, paragraph1, paragraph2, password, email, phone, instagram, facebook, "placeId") FROM stdin;
e1dc38e6-e527-494f-a682-3c9e729bd4b0	2024-04-26 07:05:46.614292	2024-04-26 07:05:46.614292	louis	\N	\N	$2a$10$2RYc6mEi6RqNY.XLu8JzZur/eWRzWee6FpFAueVJyejG.bHcVVsQC	\N	\N	\N	\N	\N
\.


--
-- Name: migrations_id_seq; Type: SEQUENCE SET; Schema: public; Owner: sakana-san-db
--

SELECT pg_catalog.setval('public.migrations_id_seq', 1, true);


--
-- Name: project PK_4d68b1358bb5b766d3e78f32f57; Type: CONSTRAINT; Schema: public; Owner: sakana-san-db
--

ALTER TABLE ONLY public.project
    ADD CONSTRAINT "PK_4d68b1358bb5b766d3e78f32f57" PRIMARY KEY (id);


--
-- Name: migrations PK_8c82d7f526340ab734260ea46be; Type: CONSTRAINT; Schema: public; Owner: sakana-san-db
--

ALTER TABLE ONLY public.migrations
    ADD CONSTRAINT "PK_8c82d7f526340ab734260ea46be" PRIMARY KEY (id);


--
-- Name: place PK_96ab91d43aa89c5de1b59ee7cca; Type: CONSTRAINT; Schema: public; Owner: sakana-san-db
--

ALTER TABLE ONLY public.place
    ADD CONSTRAINT "PK_96ab91d43aa89c5de1b59ee7cca" PRIMARY KEY (id);


--
-- Name: user PK_cace4a159ff9f2512dd42373760; Type: CONSTRAINT; Schema: public; Owner: sakana-san-db
--

ALTER TABLE ONLY public."user"
    ADD CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY (id);


--
-- Name: address PK_d92de1f82754668b5f5f5dd4fd5; Type: CONSTRAINT; Schema: public; Owner: sakana-san-db
--

ALTER TABLE ONLY public.address
    ADD CONSTRAINT "PK_d92de1f82754668b5f5f5dd4fd5" PRIMARY KEY (id);


--
-- Name: media PK_f4e0fcac36e050de337b670d8bd; Type: CONSTRAINT; Schema: public; Owner: sakana-san-db
--

ALTER TABLE ONLY public.media
    ADD CONSTRAINT "PK_f4e0fcac36e050de337b670d8bd" PRIMARY KEY (id);


--
-- Name: session PK_f55da76ac1c3ac420f444d2ff11; Type: CONSTRAINT; Schema: public; Owner: sakana-san-db
--

ALTER TABLE ONLY public.session
    ADD CONSTRAINT "PK_f55da76ac1c3ac420f444d2ff11" PRIMARY KEY (id);


--
-- Name: user REL_62a2b002bd81c8912b20be6dca; Type: CONSTRAINT; Schema: public; Owner: sakana-san-db
--

ALTER TABLE ONLY public."user"
    ADD CONSTRAINT "REL_62a2b002bd81c8912b20be6dca" UNIQUE ("placeId");


--
-- Name: place REL_b827ce7039f2c65e99a276b09e; Type: CONSTRAINT; Schema: public; Owner: sakana-san-db
--

ALTER TABLE ONLY public.place
    ADD CONSTRAINT "REL_b827ce7039f2c65e99a276b09e" UNIQUE ("addressId");


--
-- Name: project FK_163c11a6d003fcf65702084c246; Type: FK CONSTRAINT; Schema: public; Owner: sakana-san-db
--

ALTER TABLE ONLY public.project
    ADD CONSTRAINT "FK_163c11a6d003fcf65702084c246" FOREIGN KEY ("placeId") REFERENCES public.place(id) ON DELETE SET NULL;


--
-- Name: user FK_62a2b002bd81c8912b20be6dcaf; Type: FK CONSTRAINT; Schema: public; Owner: sakana-san-db
--

ALTER TABLE ONLY public."user"
    ADD CONSTRAINT "FK_62a2b002bd81c8912b20be6dcaf" FOREIGN KEY ("placeId") REFERENCES public.place(id) ON DELETE SET NULL;


--
-- Name: media FK_6f4235d4dc481366dc1db340ab2; Type: FK CONSTRAINT; Schema: public; Owner: sakana-san-db
--

ALTER TABLE ONLY public.media
    ADD CONSTRAINT "FK_6f4235d4dc481366dc1db340ab2" FOREIGN KEY ("healedsId") REFERENCES public.project(id);


--
-- Name: session FK_8266a404ae14f74d2b75b9cf229; Type: FK CONSTRAINT; Schema: public; Owner: sakana-san-db
--

ALTER TABLE ONLY public.session
    ADD CONSTRAINT "FK_8266a404ae14f74d2b75b9cf229" FOREIGN KEY ("placeId") REFERENCES public.place(id);


--
-- Name: media FK_8fab58758ca6a3ba2c22d3722c1; Type: FK CONSTRAINT; Schema: public; Owner: sakana-san-db
--

ALTER TABLE ONLY public.media
    ADD CONSTRAINT "FK_8fab58758ca6a3ba2c22d3722c1" FOREIGN KEY ("projectId") REFERENCES public.project(id);


--
-- Name: place FK_b827ce7039f2c65e99a276b09ec; Type: FK CONSTRAINT; Schema: public; Owner: sakana-san-db
--

ALTER TABLE ONLY public.place
    ADD CONSTRAINT "FK_b827ce7039f2c65e99a276b09ec" FOREIGN KEY ("addressId") REFERENCES public.address(id) ON DELETE CASCADE;


--
-- PostgreSQL database dump complete
--

