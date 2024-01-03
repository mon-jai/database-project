--
-- PostgreSQL database dump
--

-- Dumped from database version 16.1 (Debian 16.1-1.pgdg120+1)
-- Dumped by pg_dump version 16.1

-- Started on 2024-01-03 11:07:20 UTC

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
-- TOC entry 3397 (class 0 OID 16398)
-- Dependencies: 216
-- Data for Name: User; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public."User" VALUES
	(1, '2024-01-03 10:56:50.625', 'admin', '$2b$04$rsiejUm7Zz4KT0QCi5gy9e7IFrqkBwCuM854XF09g0CUWmFYjvIaC', 'admin@domain.com', '0000000000', 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAAAXNSR0IArs4c6QAAAvBJREFUaEPtWYlNBDEMNJ1AJUAlQCVAJUAlQCVAJcCc1sgyfndzQSsRCXG6S7Iz9vhJ9oR2Pk52jp/+CQQevCai8+X3VyJ6PIa3R3vglIgA/NYA+05EL0T0tPwfwmcEAQZ99W1lfK4MkAGRu8rkaM4WAhdEBNCw+NrBXlktsS6BSCKSBFuYde/JSq9pS6xCoCMRAL93Ahb7wGsI7MxrZYllBKBRKyAta3f0zEYBGZDyRkokI/DsPEBKBJ+3jEyWkNWl94AugdQiy4MgEQDjOoB1WaCyxJAYpFeGEQCIs8TUAAGveekUe9wU6sCb2GMaAVgN4LNR8eJ0ArA4HqoHwFrewPfQtRc/0wnoYNcAQeKhoe3pBD6F6b1YsUh4SWQqAWQcWJcHgtTrPHVdgYwQpHr8KQEPFEDqQEfVtgrgVAIaVESg6q2pBHQGivK2DnbUFSsTTSUAaWhgljQQJ7KJiwrjdAJWEeNe/2M5N+h6EElNZjUkBCQGc2S9kLaa53JsXulcGUQESktyE4Fq2gOwrKtk8F7m4d91oIfzMw9oAlGOZwAggjMEd5f4vnOgH0qgmrc9iYJE97ygZRsaLfNAJ0VmXWj1d00gxJgR0Cky6yKrIKN5MgOFZwFsUiGg4yDMChsZaOunz6oQ0DLKTmaYL/84iLGO/zye0vqYE6Xtwx4VAlal1YEFL2U3DBK0df2is09q/Q4BnY04FioXVpGqZHqFfGS1jir1z55VD1he2Cj3cHkavLy6Q8A792pp4NIWAyC4BnBMQGaywHksStbvSIgfZPU7ay65orajpP01HsAa695nbW2wzshZhvvlsY6EeLElpS4J7w6pLJ21HuB1Xv9feWkxDPyaGJAu9OLBu+PnLtW6Wq90uWbAr5GQ3Ci6TkQwwiOQF9pr751AWzYSwFYCXmBXakT1ojfcawQBJtGpytmprGKAw5xRBGSGil6zVoK8DP4YBCQRfh+GWwnIZRcvulvWGzF5tIRGYGrtsXsCXxrO8zFu2S6/AAAAAElFTkSuQmCC', 'Admin'),
	(2, '2024-01-02 12:54:07.363', 'mon.jai.tw', '$2b$04$CSrO3aD8wZjCiPvDjJAVIeb83GARRtfNIOvNRnBpGN.zZt3Ey.26S', 'user@domain.com', '0970685586', 'data:image/jpeg;base64,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', 'Customer');


--
-- TOC entry 3398 (class 0 OID 16407)
-- Dependencies: 217
-- Data for Name: Customer; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public."Customer" VALUES
	(2, '2003-04-24 00:00:00', 'Male', '106344 台北市忠孝東路三段一號'),
	(3, NULL, NULL, NULL);


--
-- TOC entry 3406 (class 0 OID 16447)
-- Dependencies: 227
-- Data for Name: Coupon; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public."Coupon" VALUES
	(1, 2, 0.7),
	(2, 2, 0.95),
	(3, 2, 0.75),
	(4, 2, 0.8);


--
-- TOC entry 3400 (class 0 OID 16413)
-- Dependencies: 219
-- Data for Name: CreditCard; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public."CreditCard" VALUES
	(2, 2, '7558445521452373', '156', '2025', '05'),
	(1, 2, '524531282682252', '223', '2027', '07');


--
-- TOC entry 3402 (class 0 OID 16433)
-- Dependencies: 223
-- Data for Name: Order; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public."Order" VALUES
	(3, 2, '2024-01-02 20:10:58.629', NULL, 2, 2),
	(2, 2, '2024-01-02 20:10:48.884', NULL, 2, NULL),
	(1, 2, '2024-01-02 18:49:16.143', '2024-01-04 00:00:00', 2, 1);


--
-- TOC entry 3403 (class 0 OID 16440)
-- Dependencies: 224
-- Data for Name: OrderItem; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public."OrderItem" VALUES
	(1, 1, 5588, 1),
	(1, 2, 4688, 2),
	(3, 2, 4688, 2),
	(3, 3, 4150, 3),
	(2, 85, 2699, 2),
	(2, 89, 17399, 3),
	(1, 3, 4150, 1),
	(1, 4, 5990, 3),
	(2, 84, 4299, 1),
	(3, 49, 18990, 2);


--
-- TOC entry 3404 (class 0 OID 16443)
-- Dependencies: 225
-- Data for Name: ShoppingCart; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public."ShoppingCart" VALUES
	(2, 2, 2),
	(2, 3, 3),
	(2, 1, 4);


--
-- TOC entry 3412 (class 0 OID 0)
-- Dependencies: 226
-- Name: Coupon_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."Coupon_id_seq"', 4, true);


--
-- TOC entry 3413 (class 0 OID 0)
-- Dependencies: 218
-- Name: CreditCard_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."CreditCard_id_seq"', 2, true);


--
-- TOC entry 3414 (class 0 OID 0)
-- Dependencies: 222
-- Name: Order_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."Order_id_seq"', 3, true);


--
-- TOC entry 3415 (class 0 OID 0)
-- Dependencies: 215
-- Name: User_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."User_id_seq"', 3, true);


-- Completed on 2024-01-03 11:07:20 UTC

--
-- PostgreSQL database dump complete
--
