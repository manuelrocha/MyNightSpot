delete from Event;

insert into Price (Price_ID,Guest,Man,Woman) values (1,1,1,1);
insert into Event (Event_ID,Name,Date,Description,Visualizations,Path_Flyer,Price_ID,Place_ID) values (1,"Portugal",STR_TO_DATE('2013-02-11', '%Y-%m-%d'),"Braga",1,"../images/1.jpg",1,1);
insert into Event (Event_ID,Name,Date,Description,Visualizations,Path_Flyer,Price_ID,Place_ID) values (2,"Portugal",STR_TO_DATE('2013-03-11', '%Y-%m-%d'),"Braga",1,"../images/2.jpg",1,1);
insert into Event (Event_ID,Name,Date,Description,Visualizations,Path_Flyer,Price_ID,Place_ID) values (3,"Portugal",STR_TO_DATE('2013-04-11', '%Y-%m-%d'),"Braga",1,"../images/3.jpg",1,1);
insert into Event (Event_ID,Name,Date,Description,Visualizations,Path_Flyer,Price_ID,Place_ID) values (4,"Portugal",STR_TO_DATE('2013-05-11', '%Y-%m-%d'),"Braga",1,"../images/4.jpg",1,1);
insert into Event (Event_ID,Name,Date,Description,Visualizations,Path_Flyer,Price_ID,Place_ID) values (5,"Portugal",STR_TO_DATE('2013-06-11', '%Y-%m-%d'),"Braga",1,"../images/5.jpg",1,1);

	
commit;

